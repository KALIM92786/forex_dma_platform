import React, { useState } from "react";
import axios from "axios";

const LiveTrade = () => {
  const [pair, setPair] = useState("");
  const [side, setSide] = useState("buy");
  const [units, setUnits] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrade = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/live_trade", {
        pair,
        side,
        units,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error: " + (error.response ? error.response.data.detail : error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Live Forex Trading</h2>

      <form onSubmit={handleTrade} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Pair</label>
          <input
            type="text"
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            placeholder="EUR/USD"
            className="w-full p-2 mt-1 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Side</label>
          <select
            value={side}
            onChange={(e) => setSide(e.target.value)}
            className="w-full p-2 mt-1 border rounded-md"
            required
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Units</label>
          <input
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            min="1"
            className="w-full p-2 mt-1 border rounded-md"
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </form>

      {message && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">{message}</p>
        </div>
      )}
    </div>
  );
};

export default LiveTrade;
