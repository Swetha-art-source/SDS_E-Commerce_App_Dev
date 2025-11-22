// src/pages/AdminProductsPage.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProductsPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "", // will store base64
    stock: "",
  });

  const [message, setMessage] = useState("");

  // Convert file → Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result, // store base64
      });
    };
  };

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("✅ Product added successfully!");
      console.log("Added Product:", response.data);

      // Clear fields
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Failed to add product!");
    }
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button style={styles.backBtn} onClick={() => navigate("/admin")}>
        ⬅ Back to Dashboard
      </button>

      <h2>Admin – Add New Product</h2>

      {message && <p style={styles.message}>{message}</p>}

      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {/* Image Upload Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
          style={styles.input}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Add Product</button>
      </form>
    </div>
  );
};

// Simple styling
const styles = {
  container: {
    padding: "30px",
    maxWidth: "500px",
    margin: "auto",
    background: "#f8f8f8",
    borderRadius: "10px",
    marginTop: "40px",
  },
  backBtn: {
    padding: "8px 14px",
    marginBottom: "20px",
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
  },
  textarea: {
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    minHeight: "80px",
  },
  button: {
    padding: "12px",
    background: "black",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  message: {
    padding: "10px 0",
    fontWeight: "600",
  },
};

export default AdminProductsPage;
