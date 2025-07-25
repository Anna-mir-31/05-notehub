import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async (page: number, search?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
  });

  if (search?.trim()) {
    params.append('search', search.trim());
  }

  const response = await axios.get(`${BASE_URL}/notes?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
};

export const createNote = async (note: { title: string; content: string; tag: string }) => {
  const response = await axios.post(`${BASE_URL}/notes`, note, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
};