// src/pages/AdminProductsListPage.jsx
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

      {/* Back Button */}
      <button style={styles.backButton} onClick={() => navigate("/admin")}>
        ⬅ Back
      </button>

      <h2 style={styles.pageTitle}>Products List</h2>

      {/* Add Product Button */}
      <button
        style={styles.addButton}
        onClick={() => navigate("/admin/products")}
      >
        ➕ Add Product
      </button>

      {/* Products Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Price (₹)</th>
            <th style={styles.th}>Stock</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td style={styles.td}>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ height: "50px", borderRadius: "6px" }}
                  />
                ) : (
                  "No Image"
                )}
              </td>

              <td style={styles.td}>{p.name}</td>
              <td style={styles.td}>{p.price}</td>
              <td style={styles.td}>{p.stock}</td>

              <td style={styles.td}>
                <div style={styles.actionCol}>
                  <button
                    style={styles.iconBtn}
                    onClick={() => navigate(`/admin/edit-product/${p._id}`)}
                  >
                    ✏
                  </button>

                  <button
                    style={styles.iconBtnDelete}
                    onClick={() => deleteProduct(p._id)}
                  >
                    ❌
                  </button>
                </div>
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
    padding: "20px 40px",
    fontFamily: "Arial, sans-serif",
  },

  backButton: {
    padding: "8px 14px",
    background: "#444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    marginBottom: "15px",
  },

  pageTitle: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  addButton: {
    padding: "10px 18px",
    background: "#1c7c1c",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    marginBottom: "15px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "6px",
    overflow: "hidden",
  },

  th: {
    textAlign: "left",
    padding: "12px 15px",
    background: "#f3f3f3",
    borderBottom: "2px solid #ddd",
    fontWeight: "600",
    fontSize: "14px",
  },

  td: {
    padding: "12px 15px",
    borderBottom: "1px solid #e1e1e1",
    fontSize: "14px",
  },

  actionCol: {
    display: "flex",
    gap: "10px",
  },

  iconBtn: {
    padding: "6px 10px",
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },

  iconBtnDelete: {
    padding: "6px 10px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default AdminProductsListPage;
