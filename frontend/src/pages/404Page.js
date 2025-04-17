import React from "react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg mt-2">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="text-blue-500 mt-4 underline">
        Go back to Home
      </a>
    </div>
  );
}
