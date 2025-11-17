// src/pages/ProductDetailsPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">Loading...</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-700">
          Product not found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-md">
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-medium"
      >
        ← Back to Products
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-semibold text-green-700 mb-3">
            {product.name}
          </h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-gray-800 mb-6">
            ₹{product.price}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => addToCart(product)}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="border border-gray-400 text-gray-700 px-6 py-2 rounded hover:bg-gray-100"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
