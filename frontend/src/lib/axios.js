import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "http://localhost:5001/api"
      : "https://nexchat-app-ohn7.onrender.com/api",
  withCredentials: true,
});