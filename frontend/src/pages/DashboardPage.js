import React from "react";

export default function DashboardPage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Trading Performance Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Total Trades</h2>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Profit/Loss</h2>
          <p className="text-2xl font-bold text-green-500">+$5,000</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Winning Trades</h2>
          <p className="text-2xl font-bold">85</p>
        </div>
      </div>
    </div>
  );
}
