import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user, isGuest } = useAuth();
  const navigate = useNavigate();

  // ✅ Calculate total
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // ✅ Checkout Logic
  const handleCheckout = () => {
    // If guest → redirect to signup
    if (isGuest || !user) {
      alert("Please sign up or log in to proceed with checkout!");
      navigate("/signup");
      return;
    }

    // If admin → show special message
    if (user?.role === "admin") {
      alert("Admin checkout is not applicable — viewing as admin!");
      navigate("/admin");
      return;
    }

    // If authorized user → go to checkout
    navigate("/checkout");
  };

  // ✅ Empty Cart Case
  if (!cart || cart.length === 0) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          Your cart is empty 🛒
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          Back to Shopping
        </button>
      </div>
    );
  }

  // ✅ Main Cart Layout
  return (
    <div className="max-w-5xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 font-medium transition"
      >
        ← Continue Shopping
      </button>

      <h1 className="text-3xl font-semibold text-green-700 mb-8 text-center">
        🛒 Shopping Cart
      </h1>

      <div className="divide-y divide-gray-200">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between py-4 gap-6 sm:gap-4"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4 w-full sm:w-1/2">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg shadow-sm border"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm">₹{item.price}</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  item.quantity > 1
                    ? updateQuantity(item.id, item.quantity - 1)
                    : removeFromCart(item.id)
                }
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition"
              >
                −
              </button>
              <span className="min-w-[24px] text-center font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition"
              >
                +
              </button>
            </div>

            {/* Price + Remove */}
            <div className="flex items-center gap-4 text-right">
              <p className="font-semibold text-gray-800">
                ₹{item.price * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-700 text-sm font-medium transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Footer Section */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t pt-6 gap-4">
        <h2 className="text-2xl font-semibold">
          Total:{" "}
          <span className="text-green-700">₹{totalAmount.toFixed(2)}</span>
        </h2>

        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="border border-gray-400 px-5 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Clear Cart
          </button>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
