import React from "react";

export default function Card({ title, children, footer }) {
  return (
    <div className="border rounded shadow p-4 bg-white">
      {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
      <div>{children}</div>
      {footer && <div className="mt-4 border-t pt-2 text-sm text-gray-500">{footer}</div>}
    </div>
  );
}
