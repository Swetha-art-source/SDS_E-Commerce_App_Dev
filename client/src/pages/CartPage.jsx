// src/pages/CartPage.jsx
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Your cart is empty 🛒
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Back to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-md">
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-medium"
      >
        ← Back to Products
      </button>

      <h1 className="text-3xl font-semibold text-green-700 mb-6 text-center">
        Shopping Cart
      </h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b border-gray-200 py-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">₹{item.price}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-semibold text-gray-800">
              ₹{item.price * item.quantity}
            </p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <h2 className="text-xl font-semibold">
          Total: ₹{totalAmount.toFixed(2)}
        </h2>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
          >
            Clear Cart
          </button>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
