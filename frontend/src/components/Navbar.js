import React from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-semibold">Forex DMA</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/profile" className="text-white">Profile</Link>
          <Link to="/orders" className="text-white">Orders</Link>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}
