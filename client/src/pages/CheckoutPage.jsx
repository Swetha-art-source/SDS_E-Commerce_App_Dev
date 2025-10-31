// src/pages/Checkout.jsx
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <p><strong>Name:</strong> {user?.name || "N/A"}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Address:</strong> {user?.address || "N/A"}</p>
      <p><strong>Phone:</strong> {user?.phone || "N/A"}</p>

      <button className="w-full mt-6 bg-blue-500 text-white p-2 rounded">
        Confirm Order
      </button>
    </div>
  );
};

export default Checkout;
