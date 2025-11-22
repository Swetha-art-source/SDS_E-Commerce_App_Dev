// src/pages/ProductsListPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProductsListPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:5000/api/products");
    setProducts(response.data);
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div style={styles.container}>
      <h2>Products List</h2>

      {/* Add Product Icon */}
      <button
        style={styles.addButton}
        onClick={() => navigate("/admin/products")}
      >
        ➕ Add Product
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>

              <td style={styles.actionCol}>
                {/* Edit icon */}
                <button
                  style={styles.iconBtn}
                  onClick={() => navigate(`/admin/edit-product/${p._id}`)}
                >
                  ✏
                </button>

                {/* Delete icon */}
                <button
                  style={styles.iconBtnDelete}
                  onClick={() => deleteProduct(p._id)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "30px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  addButton: {
    padding: "8px 14px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "15px",
  },
  actionCol: {
    display: "flex",
    gap: "10px",
  },
  iconBtn: {
    padding: "6px 8px",
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  iconBtnDelete: {
    padding: "6px 8px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AdminProductsListPage;
