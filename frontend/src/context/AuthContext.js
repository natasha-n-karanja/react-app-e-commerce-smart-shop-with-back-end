import { createContext, useContext, useState, useEffect } from "react";
import { api, getToken } from "../api";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      api.me().then((res) => setUser(res.user)).catch(() => {
        localStorage.removeItem("token");
      });
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.login(email, password);
    localStorage.setItem("token", res.access_token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthed: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
