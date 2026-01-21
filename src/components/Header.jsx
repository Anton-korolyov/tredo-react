import "./Header.css";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useTranslation } from "react-i18next";
import CitySelect from "./CitySelect";
import logo from "../assets/logo.png";
export default function Header({
  onAdd,
  onLogin,
  onRegister,

  search,
  categoryId,
  cityId,

  onSearchChange,
  onCategoryChange,
  onCityChange,
}) {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  const [openUser, setOpenUser] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [categories, setCategories] = useState([]);

  // ================= LOAD CATEGORIES =================
  useEffect(() => {
    api
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Categories error", err));
  }, []);

  return (
   <header className="header">
  <div className="header-inner">

    {/* RIGHT */}
    <div className="header-right">
      <div className="logo">
        <img src={logo} alt="Tredo" />
      </div>
    </div>

    {/* CENTER */}
    <div className="header-center">
      <div className={`search-box ${showFilters ? "open" : ""}`}>
        <div className="search-main">
          <input
            type="text"
            placeholder={t("search")}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="search-item">
          <CitySelect value={cityId} onChange={onCityChange} />
        </div>

        <div className="search-item">
          <select
            className="category-select"
            value={categoryId || ""}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">{t("allCategories")}</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>

    {/* LEFT */}
    <div className="header-left">
      <button className="btn add" onClick={onAdd}>
        ➕ {t("createCard")}
      </button>

      <div className="auth-buttons">
        {!user ? (
          <>
            <button className="btn secondary" onClick={onLogin}>
              {t("login")}
            </button>
            <button className="btn primary" onClick={onRegister}>
              {t("register")}
            </button>
          </>
        ) : (
          <div className="user-menu">
            <button
              className="user-btn"
              onClick={() => setOpenUser((v) => !v)}
            >
              👤 {user.email}
            </button>
          </div>
        )}
      </div>
    </div>

  </div>
</header>

  );
}
