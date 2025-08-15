import { useEffect, useState } from "react";
import { api } from "../api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.products()
      .then(setProducts)
      .catch((e) => setError(e.message || "Failed to load products"));
  }, []);

  if (error) return <div className="container py-4 text-danger">Error: {error}</div>;
  if (!products) return <div className="container py-4">Loading products…</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-3">Products</h2>
      <div className="row g-3">
        {products.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-lg-4">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
