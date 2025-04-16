// src/pages/ChartPage.js
import React from "react";
import TradingChart from "../components/TradingChart";

export default function ChartPage() {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Live Trading Chart</h1>
      <TradingChart />
    </div>
  );
}
