import axios from "axios";
import { API_BASE_URL } from "./config";

export const updateUser = async (data, token) => {
  const res = await axios.put(`${API_BASE_URL}/user`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getProfile = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
