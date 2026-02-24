import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "https://nexchat-app-ohn7.onrender.com/api"   // ✅ Render backend
      : "http://localhost:5001/api",                 // ✅ Local dev
  withCredentials: true,
});