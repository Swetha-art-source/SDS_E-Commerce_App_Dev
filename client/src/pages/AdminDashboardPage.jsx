// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        🧑‍💼 Admin Dashboard
      </h1>

      <div className="space-x-4">
        <button
          onClick={() => navigate("/admin/products")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Manage Products
        </button>

        <button
          onClick={() => navigate("/admin/orders")}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          View Orders
        </button>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
