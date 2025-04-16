import React, { useState } from 'react';

export default function OrderForm() {
  const [pair, setPair] = useState('');
  const [amount, setAmount] = useState('');
  const [orderType, setOrderType] = useState('buy');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Order submission logic here
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Place Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="pair" className="block text-sm font-medium text-gray-700">Pair</label>
          <input
            type="text"
            id="pair"
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="e.g., EUR/USD"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Order Type</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="orderType"
                value="buy"
                checked={orderType === 'buy'}
                onChange={() => setOrderType('buy')}
                className="mr-1"
              />
              Buy
            </label>
            <label>
              <input
                type="radio"
                name="orderType"
                value="sell"
                checked={orderType === 'sell'}
                onChange={() => setOrderType('sell')}
                className="mr-1"
              />
              Sell
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
