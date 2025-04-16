# backend/main.py
import os
import asyncio
import random
from fastapi import FastAPI, HTTPException, WebSocket, Query, Depends, Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from dotenv import load_dotenv

# Import models and database
from backend.models import Order, Fill, User
from backend.database import Base, engine, SessionLocal, get_db

# Import OANDA functions and authentication helpers
from backend.oanda_api import fetch_oanda_live_rate, execute_oanda_trade
from backend.auth import get_password_hash, verify_password, create_access_token

load_dotenv()

OANDA_API_KEY = os.getenv("OANDA_API_KEY")
OANDA_ACCOUNT_ID = os.getenv("OANDA_ACCOUNT_ID")
OANDA_BASE_URL = os.getenv("OANDA_BASE_URL", "https://api-fxpractice.oanda.com")

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Data Schemas -----------------

class OrderSchema(BaseModel):
    pair: str  # e.g., "EUR/USD"
    type: str  # "buy" or "sell"
    amount: float

class LiveTradeSchema(BaseModel):
    pair: str  # e.g., "EUR_USD"
    side: str  # "buy" or "sell"
    units: int

class UserCreate(BaseModel):
    username: str
    password: str

class TokenData(BaseModel):
    access_token: str
    token_type: str

class UserLogin(BaseModel):
    username: str
    password: str

# ----------------- Public Endpoints -----------------

@app.get("/")
def read_root():
    return {"message": "Forex DMA Backend Live"}

@app.get("/oanda_live_rate")
def get_oanda_live_rate(instrument: str = Query(...)):
    instrument = instrument.strip().upper().replace("/", "_")
    live_rate = fetch_oanda_live_rate(instrument=instrument)
    if live_rate is None:
        raise HTTPException(status_code=500, detail="Failed to fetch OANDA live rate.")
    return {"instrument": instrument, "live_rate": live_rate}

@app.post("/place_order")
async def place_order(order: OrderSchema, db: Session = Depends(get_db)):
    pair_normalized = order.pair.strip().replace(" ", "").upper()
    instrument = pair_normalized.replace("/", "_")
    live_rate = fetch_oanda_live_rate(instrument=instrument)
    if live_rate is None:
        raise HTTPException(status_code=500, detail="Failed to fetch OANDA live rate.")

    new_order = Order(
        pair=pair_normalized,
        type=order.type.lower(),
        amount=order.amount,
        price=live_rate,
        status="pending"
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    # Simple matching engine logic (FIFO, price tolerance)
    opposite_type = "buy" if new_order.type == "sell" else "sell"
    matching_orders = db.query(Order).filter(
        Order.pair == pair_normalized,
        Order.type == opposite_type,
        Order.status == "pending"
    ).order_by(Order.timestamp.asc()).all()

    matched = False
    remaining_amount = new_order.amount
    price_tolerance = 0.0001

    for match in matching_orders:
        if abs(live_rate - match.price) <= price_tolerance:
            match_amount = min(match.amount, remaining_amount)
            match.amount -= match_amount
            remaining_amount -= match_amount
            new_fill = Fill(
                buy_order_id=match.id if match.type == "buy" else new_order.id,
                sell_order_id=match.id if match.type == "sell" else new_order.id,
                pair=pair_normalized,
                amount=match_amount
            )
            db.add(new_fill)
            if match.amount == 0:
                match.status = "filled"
            if remaining_amount == 0:
                new_order.status = "filled"
                matched = True
                break

    if remaining_amount > 0:
        new_order.amount = remaining_amount
        new_order.status = "pending"
        db.add(new_order)

    db.commit()
    db.refresh(new_order)
    db.close()
    return {
        "message": "Order matched and filled." if matched else f"{order.type.upper()} order placed and pending match.",
        "order_id": new_order.id
    }

@app.post("/live_trade")
def live_trade(order: LiveTradeSchema):
    pair = order.pair.strip().upper().replace("/", "_")
    side = order.side.lower()
    units = order.units

    if side not in ["buy", "sell"]:
        raise HTTPException(status_code=400, detail="Invalid side. Use 'buy' or 'sell'.")

    try:
        result = execute_oanda_trade(pair=pair, units=units, side=side)
        return {
            "message": f"Live {side.upper()} order placed for {units} units of {pair}.",
            "result": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Trade failed: {str(e)}")

@app.get("/orders")
def get_orders(db: Session = Depends(get_db)):
    orders = db.query(Order).order_by(Order.timestamp.desc()).all()
    return [o.__dict__ for o in orders]

@app.get("/fills")
def get_fills(db: Session = Depends(get_db)):
    fills = db.query(Fill).order_by(Fill.timestamp.desc()).all()
    return [f.__dict__ for f in fills]

@app.get("/orderbook/{pair}")
async def get_orderbook(pair: str, db: Session = Depends(get_db)):
    normalized_pair = pair.strip().replace(" ", "").upper()
    buy_orders = db.query(Order).filter(
        Order.pair == normalized_pair,
        Order.type == "buy",
        Order.status == "pending"
    ).order_by(Order.timestamp.asc()).all()
    sell_orders = db.query(Order).filter(
        Order.pair == normalized_pair,
        Order.type == "sell",
        Order.status == "pending"
    ).order_by(Order.timestamp.asc()).all()
    return {
        "pair": normalized_pair,
        "buy_orders": [{"id": o.id, "amount": o.amount, "price": o.price, "timestamp": o.timestamp} for o in buy_orders],
        "sell_orders": [{"id": o.id, "amount": o.amount, "price": o.price, "timestamp": o.timestamp} for o in sell_orders],
    }

@app.websocket("/ws/forex")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            price = round(1.135 + random.uniform(-0.005, 0.005), 5)
            await websocket.send_json({"pair": "EUR/USD", "price": price})
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        print("WebSocket disconnected")

# ------------------- Authentication Endpoints -------------------

@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    # Check if the username is already registered
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = User(username=user.username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

@app.post("/token")
def login(form_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# ------------------- Initialize Database -------------------
Base.metadata.create_all(bind=engine)
