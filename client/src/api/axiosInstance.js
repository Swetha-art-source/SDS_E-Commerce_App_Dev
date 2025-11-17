// src/api/axiosInstance.js
import axios from "axios";

// base instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // change if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: global error handling (auto-logout on 401)
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    // If unauthorized, clear token and redirect to login
    if (status === 401) {
      localStorage.removeItem("token");
      // optional: show a toast before redirecting
      // window.toast?.error?.("Session expired. Please login again.");
      // force redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
