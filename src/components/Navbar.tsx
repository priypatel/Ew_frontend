import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
export default function Navbar() {
  const { user } = useAuth();
  return (
    <>
      <nav className="bg-white shadow-md p-4 top-0 z-20">
        <div className="max-w-6xl mx-auto flex item-center justify-between">
          <Link to="/" className="text-xl font-bold text-blue-400 no-underline">
            Product
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/cart"
              className="text-xl font-bold text-blue-400 hover:text-blue-600 no-underline"
            >
              <span>Cart</span>
            </Link>
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-xl font-bold text-blue-400 hover:text-blue-600 no-underline"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-xl font-bold text-blue-400 hover:text-blue-600 no-underline"
                >
                  Register
                </Link>
              </>
            ) : (
              <Link
                to="/addProducts"
                className="text-xl font-bold text-blue-400 hover:text-blue-600 no-underline"
              >
                Add Products
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
