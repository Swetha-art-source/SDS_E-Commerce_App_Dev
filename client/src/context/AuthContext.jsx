// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  // ----------------------------------------------------
  // Load user from token on page refresh
  // ----------------------------------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      setUser({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        token,
      });
    }
  }, []);

  // ----------------------------------------------------
  // SIGNUP  (role is NOT sent from frontend)
  // ----------------------------------------------------
  const signup = async (name, email, password) => {
    try {
      const res = await axiosInstance.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      const token = res.data.token;
      if (!token) return alert("Signup failed: No token received!");

      const decoded = parseJwt(token);
      localStorage.setItem("token", token);

      setUser({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        token,
      });

      // Redirect
      if (decoded.role === "admin") navigate("/admin");
      else navigate("/home");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed!");
    }
  };

  // ----------------------------------------------------
  // LOGIN  (Unified with signup — uses token only)
  // ----------------------------------------------------
  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/api/auth/login", { email, password });

      const token = res.data.token;
      if (!token) return alert("Login failed: No token received!");

      const decoded = parseJwt(token);

      // Save in localStorage
      localStorage.setItem("token", token);

      // Create user object
      setUser({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        token,
      });

      // Redirect based on role
      if (decoded.role === "admin") navigate("/admin");
      else navigate("/home");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  // ----------------------------------------------------
  // LOGOUT
  // ----------------------------------------------------
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsGuest(false);
    navigate("/login");
  };

  // ----------------------------------------------------
  // CONTINUE AS GUEST
  // ----------------------------------------------------
  const continueAsGuest = () => {
    setIsGuest(true);
    setUser({ role: "guest" });
    navigate("/home");
  };

  // ----------------------------------------------------
  // PARSE JWT TOKEN
  // ----------------------------------------------------
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
