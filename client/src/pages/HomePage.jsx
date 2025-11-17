import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../services/productService"; // ⬅️ IMPORTANT

function HomePage() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchAllProducts();   // ⬅️ calling the service
        console.log("Fetched products:", response);

        setProducts(response || []);        // ⬅️ stored in response.products
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading products...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        ⚠️ Failed to load products: {error}
      </p>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-green-700">
        All Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <Link
              key={item._id}
              to={`/product/${item._id}`}
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
      )}
    </div>
  );
}

export default HomePage;
