// src/pages/HomePage.js
import React from "react";
import ForexPrice from "../components/ForexPrice";
import LiveFeed from "../components/LiveFeed";
import OrderForm from "../components/OrderForm";
import OrderBook from "../components/OrderBook";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Forex DMA Platform</h1>
      <ForexPrice />
      <LiveFeed />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <OrderForm />
        <OrderBook />
      </div>
    </div>
  );
}
