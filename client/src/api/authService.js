import axios from "axios";
import { API_BASE_URL } from "./config.js";

export const registerUser = async (email, password) => {
  const res = await axios.post(`${API_BASE_URL}/auth/register`, {
    email,
    password,
  });
  return res.data;
};

export const loginUser = async (email, password) => {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);

  const res = await axios.post(`${API_BASE_URL}/auth/login`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res.data;
};
