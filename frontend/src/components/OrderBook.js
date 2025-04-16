// src/components/OrderBook.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderBook() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-lg font-semibold mb-2">Order Book</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr>
              <th className="px-2 py-1 border-b">Pair</th>
              <th className="px-2 py-1 border-b">Type</th>
              <th className="px-2 py-1 border-b">Amount</th>
              <th className="px-2 py-1 border-b">Price</th>
              <th className="px-2 py-1 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-2 py-1 border-b">{order.pair}</td>
                <td className="px-2 py-1 border-b">{order.type.toUpperCase()}</td>
                <td className="px-2 py-1 border-b">{order.amount}</td>
                <td className="px-2 py-1 border-b">{order.price}</td>
                <td className="px-2 py-1 border-b">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
