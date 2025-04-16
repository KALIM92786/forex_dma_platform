// src/pages/LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/token", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.access_token);
      setMessage("Login successful!");
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Login
        </button>
        {message && <p className="text-center mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
}
