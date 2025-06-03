import axios from "axios";
import { API_BASE_URL } from "./config";

export const createEntry = async (entryText, token, gptResult) => {
  const res = await axios.post(
    `${API_BASE_URL}/entries`,
    {
      entry_text: entryText,
      summary: gptResult?.summary,
      mood: gptResult?.mood,
      recommendation: gptResult?.recommendation,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const deleteEntry = async (entryId, token) => {
  await axios.delete(`${API_BASE_URL}/entries/${entryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getEntries = async (
  token,
  { sort = "desc", mood, start, end, skip = 0, limit = 10 } = {},
) => {
  const params = {};

  if (sort) params.sort = sort;
  if (typeof skip === "number") params.skip = skip;
  if (typeof limit === "number") params.limit = limit;
  if (mood && mood !== "all") params.mood_category = mood;
  if (start) params.start = start;
  if (end) params.end = end;

  const res = await axios.get(`${API_BASE_URL}/entries`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return res.data;
};

export const getAllEntries = async (token, filters = {}) => {
  const params = {};

  if (filters.sort) params.sort = filters.sort;

  if (filters.mood && filters.mood !== "all") {
    params.mood_category = filters.mood;
  }

  if (filters.start) params.start = filters.start;
  if (filters.end) params.end = filters.end;

  const res = await axios.get(`${API_BASE_URL}/entries/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return res.data;
};

export const updateEntry = async (id, entryText, token) => {
  const res = await axios.put(
    `${API_BASE_URL}/entries/${id}`,
    { entry_text: entryText },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const getTodayEntry = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/entries/today`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const regenerateEntry = async (id, token) => {
  const res = await axios.post(
    `${API_BASE_URL}/entries/${id}/regenerate`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};
