// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import GuestCheckout from "./pages/GuestCheckout";
import Checkout from "./pages/CheckoutPage";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboardPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/guest-checkout" element={<GuestCheckout />} />

        {/* ✅ Protected User Checkout */}
        <Route
          path="/checkout"
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <Checkout />
            </PrivateRoute>
          }
        />

        {/* ✅ Protected Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
