import React from "react";

export default function Button({ children, onClick, variant = "primary" }) {
  const baseClass = "px-4 py-2 rounded font-semibold";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 text-black hover:bg-gray-400",
  };

  return (
    <button
      onClick={onClick}
      className={${baseClass} ${variants[variant]}}
    >
      {children}
    </button>
  );
}
