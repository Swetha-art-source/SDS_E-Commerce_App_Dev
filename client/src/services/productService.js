// src/services/productService.js
import axiosInstance from "../api/axiosInstance";

export const fetchAllProducts = async () => {
  const res = await axiosInstance.get("/api/products");
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axiosInstance.get(`/api/products/${id}`);
  return res.data;
};

// protected example (will auto attach token)
export const createProduct = async (payload) => {
  const res = await axiosInstance.post("/api/products", payload);
  return res.data;
};
