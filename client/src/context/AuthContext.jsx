// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance"; // <- use axiosInstance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      setUser({ email: decoded.email, role: decoded.role, token });
    }
  }, []);

  const signup = async (name, email, password) => {
    try {
      const res = await axiosInstance.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      const newUser = res.data.user;
      setUser(newUser);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed!");
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      if (!token) throw new Error("No token in response");

      const decoded = parseJwt(token);
      const userData = { email: decoded.email, role: decoded.role, token };

      localStorage.setItem("token", token); // saved for interceptor
      setUser(userData);

      if (decoded.role === "admin") navigate("/admin");
      else navigate("/home");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Login failed!");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsGuest(false);
    navigate("/login");
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setUser({ role: "guest" });
    navigate("/home");
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
      return {};
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isGuest,
        signup,
        login,
        logout,
        continueAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
