import { API_BASE_URL } from "../services/config";
import axios from "axios";

export const fetchStatus = async () => {
  const res = await axios.get(`${API_BASE_URL}/status`);
  return res.data;
};
