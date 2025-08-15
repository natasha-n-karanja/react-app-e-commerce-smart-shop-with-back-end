import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout, isAuthed } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link className="navbar-brand" to="/">SmartShop</Link>
      <div className="ml-auto d-flex align-items-center">
        <Link className="nav-link text-white" to="/products">Products</Link>
        <Link className="nav-link text-white" to="/cart">Cart ({cart.length})</Link>
        <Link className="nav-link text-white" to="/checkout">Checkout</Link>
        {isAuthed ? (
          <>
            <span className="text-white mx-2">Hi, {user?.name}</span>
            <button onClick={handleLogout} className="btn btn-outline-light btn-sm">Logout</button>
          </>
        ) : (
          <Link className="btn btn-light btn-sm" to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
