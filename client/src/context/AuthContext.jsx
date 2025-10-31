// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  const login = (email, password) => {
    // ✅ Fixed admin credentials
    if (email === "admin@shop.com" && password === "admin123") {
      const adminUser = { email, role: "admin" };
      setUser(adminUser);
      navigate("/admin");
      return;
    }

    // ✅ Normal user credentials (for example only)
    if (email && password) {
      const normalUser = { email, role: "user" };
      setUser(normalUser);
      navigate("/home");
      return;
    }

    alert("Invalid credentials!");
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    navigate("/");
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setUser({ role: "guest" });
    navigate("/home");
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, login, logout, continueAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
