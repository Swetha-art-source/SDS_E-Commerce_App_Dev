import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import UserProfile from "./pages/UserProfile";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

import AdminDashboard from "./pages/AdminDashboardPage";
import PrivateRoute from "./components/PrivateRoute";
import AdminProductsListPage from "./pages/AdminProductsListPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminProductEditPage from "./pages/AdminProductEditPage";

function App() {
  return (
    <Routes>

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Pages WITHOUT Navbar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Pages WITH Navbar */}
      <Route 
        path="/home"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      <Route
        path="/product/:id"
        element={
          <MainLayout>
            <ProductDetailsPage />
          </MainLayout>
        }
      />

      <Route
        path="/cart"
        element={
          <MainLayout>
            <CartPage />
          </MainLayout>
        }
      />

      <Route path="/profile" element={<UserProfile />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />

      {/* ============================
           ADMIN ROUTES (PROTECTED)
         ============================ */}
      <Route
        path="/admin"
        element={
          <PrivateRoute requireAdmin={true}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/products-list"
        element={
          <PrivateRoute requireAdmin={true}>
            <AdminProductsListPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <PrivateRoute requireAdmin={true}>
            <AdminProductsPage />
          </PrivateRoute>
        }
      />

      {/* ✅ EDIT PRODUCT ROUTE */}
      <Route
        path="/admin/edit-product/:id"
        element={
          <PrivateRoute requireAdmin={true}>
            <AdminProductEditPage />
          </PrivateRoute>
        }
      />

      {/* Fallback for invalid routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default App;
