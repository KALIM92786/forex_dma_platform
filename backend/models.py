# backend/models.py
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base  # Import the Base class
from datetime import datetime

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    pair = Column(String, index=True)
    type = Column(String)  # "buy" or "sell"
    amount = Column(Float)
    price = Column(Float)
    status = Column(String, default="pending")
    timestamp = Column(DateTime, default=datetime.utcnow)

    fills = relationship("Fill", back_populates="order")

class Fill(Base):
    __tablename__ = "fills"

    id = Column(Integer, primary_key=True, index=True)
    buy_order_id = Column(Integer, ForeignKey("orders.id"))
    sell_order_id = Column(Integer, ForeignKey("orders.id"))
    pair = Column(String)
    amount = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

    order = relationship("Order", back_populates="fills")

#  User model for authentication
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
