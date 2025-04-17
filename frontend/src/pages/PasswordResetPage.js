import React, { useState } from "react";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(Password reset link sent to ${email});
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="block mb-2 text-sm font-semibold">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
