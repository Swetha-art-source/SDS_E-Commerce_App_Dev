// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // Use a ref to access the current user inside the save effect 
  // without triggering the effect when user changes.
  const userRef = useRef(user);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const getCartKey = (u) => (u && u.id ? `cart_${u.id}` : "cart_guest");

  // ✅ Load from localStorage when user changes
  useEffect(() => {
    const key = getCartKey(user);
    const stored = localStorage.getItem(key);
    if (stored) {
      setCart(JSON.parse(stored));
    } else {
      setCart([]); // Clear/reset if no cart found for this user
    }
  }, [user]);

  const firstRender = useRef(true);

  // ✅ Save to localStorage when cart changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    // Only save if we have a user (or guest) context loaded
    // We use userRef.current to get the correct key for the *current* cart state
    // This effect only runs when `cart` updates, avoiding the "save old cart to new user" bug
    const key = getCartKey(userRef.current);
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart]);

  // ✅ Add to cart (with unique product handling)
  const addToCart = (product) => {
    const productId = product.id || product._id; // 👈 REAL unique id

    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);

      if (existing) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, id: productId, quantity: 1 }];
    });
  };

  // ✅ Remove item from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Update quantity
  const updateQuantity = (id, newQuantity) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, newQuantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ✅ Clear entire cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
