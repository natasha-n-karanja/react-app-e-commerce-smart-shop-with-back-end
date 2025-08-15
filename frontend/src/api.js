const BASE_URL = "http://127.0.0.1:5000";

export function getToken() {
  return localStorage.getItem("token") || "";
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  products: () => request("/api/products"),
  login: (email, password) => request("/api/login", { method: "POST", body: { email, password } }),
  me: () => request("/api/me", { auth: true }),
  checkout: (cart) => request("/api/checkout", { method: "POST", body: { cart }, auth: true }),
};
