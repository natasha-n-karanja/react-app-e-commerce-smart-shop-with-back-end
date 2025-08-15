import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, i) => sum + Number(i.price || 0), 0);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item, idx) => (
              <li key={`${item.id}-${idx}`} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-semibold">{item.title}</div>
                  <small className="text-muted">${item.price}</small>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="fw-bold">Total: ${total}</div>
        </>
      )}
    </div>
  );
}
