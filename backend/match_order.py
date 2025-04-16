from sqlalchemy.orm import Session
from backend.models import Order, Fill
from backend.oanda_api import fetch_oanda_live_rate
from datetime import datetime

PRICE_TOLERANCE = 0.0005

async def match_order(db: Session, new_order: Order):
    # Step 1: Get live price from OANDA
    symbol = new_order.symbol
    live_data = await fetch_oanda_live_rate(symbol)
    price_data = live_data.get("prices", [])[0]
    midpoint = (float(price_data["bids"][0]["price"]) + float(price_data["asks"][0]["price"])) / 2

    # Step 2: Find opposing orders
    opposing_side = "sell" if new_order.side == "buy" else "buy"
    opposing_orders = db.query(Order)\
        .filter(Order.symbol == symbol)\
        .filter(Order.side == opposing_side)\
        .filter(Order.status == "open")\
        .order_by(Order.timestamp.asc())\
        .all()

    remaining_qty = new_order.quantity
    for opp in opposing_orders:
        # Check price tolerance
        price_diff = abs((opp.price or midpoint) - midpoint)
        if price_diff > PRICE_TOLERANCE:
            continue

        fill_qty = min(remaining_qty, opp.remaining_quantity)
        fill_price = midpoint

        # Create fill
        fill = Fill(
            order_id=new_order.id,
            filled_quantity=fill_qty,
            fill_price=fill_price,
            timestamp=datetime.utcnow()
        )
        db.add(fill)

        # Update opposing order
        opp.remaining_quantity -= fill_qty
        if opp.remaining_quantity <= 0:
            opp.status = "filled"

        # Update new order
        remaining_qty -= fill_qty
        if remaining_qty <= 0:
            break

    new_order.remaining_quantity = remaining_qty
    new_order.status = "filled" if remaining_qty <= 0 else "open"
    db.commit()
