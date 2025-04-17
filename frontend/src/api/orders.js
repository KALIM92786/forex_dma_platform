import axios from "axios";

const API_URL = "/api/orders";

export const fetchOrders = async () => {
  const response = await axios.get(${API_URL});
  return response.data;
};

export const placeOrder = async (orderData) => {
  const response = await axios.post(${API_URL}, orderData);
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await axios.delete(${API_URL}/${orderId});
  return response.data;
};
