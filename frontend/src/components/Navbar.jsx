import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const { items } = useContext(CartContext);

  return (
    <nav className="bg-black/90 border-b border-yellow-500/40 mb-4">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Hotel Chandra Bharti" className="w-10 h-10 rounded-full" />
          <span className="font-bold text-xl text-yellow-400 tracking-wide">
            Hotel Chandra Bharti
          </span>
        </Link>
        <div className="flex gap-4 items-center text-sm">
          <Link to="/menu" className="hover:text-yellow-300">
            Menu
          </Link>
          <Link to="/cart" className="hover:text-yellow-300">
            Cart ({items.length})
          </Link>
          <Link to="/table-booking" className="hover:text-yellow-300">
            Book Table
          </Link>
          <Link to="/contact" className="hover:text-yellow-300">
            Contact
          </Link>
          <Link to="/admin/login" className="text-gray-400 hover:text-yellow-300">
            Admin
          </Link>
          {token ? (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
