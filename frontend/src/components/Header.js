// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Forex DMA Platform</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/live" className="hover:underline">Live Feed</Link>
          <Link to="/trade" className="hover:underline">Trade</Link>
        </nav>
      </div>
    </header>
  );
}
