import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

export const registerUser = async (userData) => {
  const res = await axios.post("/auth/register", userData);
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await axios.post("/auth/login", credentials);
  return res.data;
};
