// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import products from "../data/products";

function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-green-700">
        All Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition block"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-600 mb-2">₹{item.price}</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
              View Details
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
