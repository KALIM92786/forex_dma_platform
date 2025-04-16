import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-semibold">Forex DMA</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/trade" className="text-white">Trade</Link>
          <Link to="/orders" className="text-white">Orders</Link>
          <Link to="/login" className="text-white">Login</Link>
        </div>
      </div>
    </nav>
  );
}
