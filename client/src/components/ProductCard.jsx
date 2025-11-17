import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 shadow-md rounded-lg">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />

      <h2 className="font-bold mt-2">{product.name}</h2>
      <p className="text-gray-500">₹{product.price}</p>

      <Link
        to={`/products/${product._id}`}
        className="bg-blue-600 text-white px-3 py-1 mt-3 block text-center rounded"
      >
        View Details
      </Link>
    </div>
  );
}
