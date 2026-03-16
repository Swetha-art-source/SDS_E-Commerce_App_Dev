import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming forgotPassword is or will be here, or handle directly

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending email for reset password (or call an API here)
    try {
      // await axios.post("/api/auth/forgot-password", { email });
      setMessage("If an account with that email exists, we have sent a password reset link.");
    } catch (error) {
       console.error(error);
       setMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {message && (
          <div className="mb-4 p-2 bg-blue-50 text-blue-700 text-sm rounded border border-blue-200">
            {message}
          </div>
        )}

        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Email Address"
            className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading || !email}
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
