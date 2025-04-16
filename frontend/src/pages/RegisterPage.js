// src/pages/RegisterPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/register", {
        username,
        password,
      });
      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}\n          onChange={(e) => setUsername(e.target.value)}\n          className=\"w-full border p-2 rounded\"\n        />\n        <input\n          type=\"password\"\n          placeholder=\"Password\"\n          value={password}\n          onChange={(e) => setPassword(e.target.value)}\n          className=\"w-full border p-2 rounded\"\n        />\n        <button type=\"submit\" className=\"bg-blue-600 text-white py-2 px-4 rounded\">\n          Register\n        </button>\n        {message && <p className=\"text-center mt-2 text-sm\">{message}</p>}\n      </form>\n    </div>\n  );\n}\n"}
