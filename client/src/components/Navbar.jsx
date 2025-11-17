import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingCart } from "lucide-react";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow bg-white">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-green-600">
        SDS Creative
      </Link>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        className="border px-4 py-2 w-96 rounded-full bg-gray-100 outline-none"
      />

      {/* Right Icons */}
      <div className="flex items-center gap-6 relative">

        {/* User Icon */}
        <button onClick={() => setOpenDropdown(!openDropdown)}>
          <User size={24} className="cursor-pointer" />
        </button>

        {/* Dropdown Menu */}
        {openDropdown && (
          <div className="absolute right-0 top-10 bg-white shadow-md w-40 rounded-md p-2 border z-50">
            <Link
              to="/profile"
              className="block p-2 hover:bg-gray-100 rounded"
              onClick={() => setOpenDropdown(false)}
            >
              User Profile
            </Link>

            <button
              className="w-full text-left p-2 hover:bg-gray-100 rounded text-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}

        {/* Cart Icon */}
        <Link to="/cart">
          <ShoppingCart size={24} className="cursor-pointer" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
