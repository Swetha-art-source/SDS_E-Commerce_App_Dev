import express from "express";
import Product from "../models/productModel.js";
import {
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js"; 

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id.trim());
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/products
// @desc    Create new product
router.post("/", async (req, res) => {
  const { name, description, price, category, stock, image } = req.body;
  try {
    const newProduct = new Product({ name, description, price, category, stock, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", updateProduct);

// 🔴 Delete product by ID
// Method: DELETE
// Endpoint: /api/products/:id
router.delete("/:id", deleteProduct);

export default router;
