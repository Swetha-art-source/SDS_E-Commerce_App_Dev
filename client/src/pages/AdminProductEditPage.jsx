import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AdminProductEditPage = () => {
  const { id } = useParams(); // fetch id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const [message, setMessage] = useState("");

  // Load existing product details on mount
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);

      setFormData({
        name: res.data.name,
        description: res.data.description,
        price: res.data.price,
        category: res.data.category,
        image: res.data.image, // already base64
        stock: res.data.stock,
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to load product data");
    }
  };

  // Convert uploaded image → Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
  };

  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update product submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("✅ Product updated successfully!");

      setTimeout(() => {
        navigate("/admin/products-list"); // navigate back after update
      }, 1200);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update product");
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate("/admin/products-list")}>
        ⬅ Back to Products
      </button>

      <h2>Edit Product</h2>

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

        {/* Current Image Preview */}
        {formData.image && (
          <img
            src={formData.image}
            alt="Current Product"
            style={{ width: "120px", marginBottom: "10px", borderRadius: "6px" }}
          />
        )}

        {/* Upload new image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
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

        <button type="submit" style={styles.button}>Update Product</button>
      </form>
    </div>
  );
};

// Same styling as Add Product Page
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
 
export default AdminProductEditPage;
