// src/components/ForexPrice.js
import React, { useEffect, useState } from "react";

export default function ForexPrice({ pair = "EUR/USD" }) {
  const [livePrice, setLivePrice] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/forex");
    ws.onopen = () => console.log("ForexPrice WebSocket connected");
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLivePrice(data);
      } catch (e) {
        setError("Invalid price format");
      }
    };
    ws.onerror = () => setError("WebSocket error");
    ws.onclose = () => console.log("ForexPrice WebSocket disconnected");
    return () => ws.close();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Live Forex Price</h2>
      {error && <p className="text-red-500">{error}</p>}
      {livePrice ? (
        <p className="text-2xl font-bold">{livePrice.pair}: {livePrice.price}</p>
      ) : (
        <p>Loading live price...</p>
      )}
    </div>
  );
}
