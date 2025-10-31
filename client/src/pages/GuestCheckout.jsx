// src/pages/GuestCheckout.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const GuestCheckout = () => {
  const { guestCheckout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    guestCheckout(form);
    navigate("/checkout");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">
          Guest Checkout
        </h2>
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="address"
          type="text"
          placeholder="Shipping Address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default GuestCheckout;
