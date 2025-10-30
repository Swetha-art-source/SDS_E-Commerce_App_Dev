// src/pages/LoginPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Temporary login for guest
    navigate("/");
  };

  const handleGuestLogin = () => {
    // Skip credentials for guest
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold text-center mb-6 text-green-700">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Sign Up
          </Link>
        </p>
        <hr className="my-4" />
        <button
          onClick={handleGuestLogin}
          className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
        >
          Sign in as Guest
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
