import { ShoppingCart, User, Search } from "lucide-react";
import logo from "../assets/images/logo.png";

function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-2">
             <img
              src={logo}
              alt="SDS Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-2xl font-bold text-green-600">SDS Creative</h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-1 w-1/3">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none px-2 w-full text-sm"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="hover:text-green-600 transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="hover:text-green-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
