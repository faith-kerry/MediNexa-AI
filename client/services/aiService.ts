import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const sendMessage = async (message: string) => {
  const response = await API.post("/ai/chat", {
    message,
  });

  return response.data;
};