import axios from "axios";
import { API_BASE_URL } from "./config";

export const fetchStatus = async () => {
  const res = await axios.get(`${API_BASE_URL}/status`);
  return res.data;
};

export const fetchSummary = async (entryText, token) => {
  const res = await axios.post(
    `${API_BASE_URL}/gpt/summary`,
    { entry_text: entryText },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};
