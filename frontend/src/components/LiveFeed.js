// src/components/LiveFeed.js
import React, { useEffect, useState } from "react";

export default function LiveFeed() {
  const [feed, setFeed] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/forex");
    ws.onopen = () => console.log("LiveFeed WebSocket connected");
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setFeed(data);
      } catch (e) {
        setError("Failed to parse feed data");
      }
    };
    ws.onerror = () => setError("WebSocket error");
    ws.onclose = () => console.log("LiveFeed WebSocket disconnected");
    return () => ws.close();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Live Feed</h2>
      {error && <p className="text-red-500">{error}</p>}
      {feed ? (
        <p className="text-sm">{feed.pair} - {feed.price}</p>
      ) : (
        <p>Connecting...</p>
      )}
    </div>
  );
}
