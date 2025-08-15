import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { isAuthed } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const res = await api.checkout(cart);
      alert(`${res.message}\nItems: ${res.count}\nTotal: $${res.total}`);
      clearCart();
      navigate("/");
    } catch (e) {
      alert(`Checkout failed: ${e.message}`);
      if (!isAuthed) navigate("/login");
    }
  };

  if (!isAuthed) {
    return (
      <div className="container py-4">
        <p>
          You need to{" "}
          <Link to="/login" className="link-primary">log in</Link>{" "}
          to place an order.
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return <div className="container py-4">Your cart is empty.</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Checkout</h2>
      <button className="btn btn-success" onClick={handleCheckout}>
        Place Order
      </button>
    </div>
  );
}
