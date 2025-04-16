// src/api/client.js
import axios from "axios";

// Create an Axios instance for backend API calls
const client = axios.create({
  baseURL: "http://127.0.0.1:8000", // Adjust to your backend URL if needed
});

export default client;
