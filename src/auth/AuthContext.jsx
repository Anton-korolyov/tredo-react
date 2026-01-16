import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== LOGIN =====
  const login = async (email, password) => {
    const res = await axios.post("/api/Auth/login", {
      email,
      password,
    });

    const userData = {
      id: res.data.userId,
      email: res.data.email,
    };

    setUser(userData);
    setAccessToken(res.data.accessToken);

    // ✅ СОХРАНЯЕМ ВСЁ
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ===== REGISTER =====
  const register = async (email, password) => {
    const res = await axios.post("/api/Auth/register", {
      email,
      password,
    });

    const userData = {
      id: res.data.userId,
      email: res.data.email,
    };

    setUser(userData);
    setAccessToken(res.data.accessToken);

    // ✅ СОХРАНЯЕМ ВСЁ
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ===== LOGOUT =====
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  // ===== RESTORE SESSION ON PAGE LOAD =====
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setAccessToken(token);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, register, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

