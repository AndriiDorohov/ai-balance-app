import axios from "axios";
import { API_BASE_URL } from "./config";

export const getGoals = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/goals`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createGoal = async (text, token) => {
  const res = await axios.post(
    `${API_BASE_URL}/goals`,
    { text },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

export const toggleGoal = async (id, token) => {
  const res = await axios.patch(
    `${API_BASE_URL}/goals/${id}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

export const deleteGoal = async (id, token) => {
  const res = await axios.delete(`${API_BASE_URL}/goals/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
