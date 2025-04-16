// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-800 text-white px-6 py-4">
        <h1 className="text-xl font-bold">Forex DMA Platform</h1>
        <nav className="mt-2 flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/chart">Chart</Link>
          <Link to="/live-feed">Live Feed</Link>
        </nav>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
