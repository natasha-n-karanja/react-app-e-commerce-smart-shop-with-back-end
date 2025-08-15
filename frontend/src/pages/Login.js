import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/checkout");
    } catch (e) {
      setError(e.message || "Login failed");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 420 }}>
      <h2 className="mb-3">Login</h2>
      {error && <div className="alert alert-danger py-2">{error}</div>}
      <form onSubmit={onSubmit} className="d-grid gap-3">
        <input
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          className="form-control"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
