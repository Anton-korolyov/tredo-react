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

        {/* LOGO */}
        <div className="logo">
           <img src={logo} alt="Tredo" />
        </div>

        
        {/* ===== MOBILE FILTER BUTTON ===== */}
        <button
          className="mobile-filters-btn"
          onClick={() => setShowFilters((v) => !v)}
        >
          ⚙️ {t("filters")}
        </button>

       

        {/* ===== FILTERS ===== */}
        <div className={`search-box ${showFilters ? "open" : ""}`}>
          {/* ===== SEARCH INPUT ===== */}
 <div className="search-main">
          <input
            type="text"
            placeholder={t("search")}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
          {/* CITY */}
          <div className="search-item">
            <CitySelect
              value={cityId}
              onChange={(id) => onCityChange(id)}
            />
          </div>

          {/* CATEGORY */}
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

        {/* ===== ADD CARD ===== */}
        <button className="btn add" onClick={onAdd}>
          ➕ {t("createCard")}
        </button>

        {/* ===== AUTH ===== */}
        <div className="auth-buttons">
          {!user && (
            <>
              <button className="btn secondary" onClick={onLogin}>
                {t("login")}
              </button>
              <button className="btn primary" onClick={onRegister}>
                {t("register")}
              </button>
            </>
          )}

          {user && (
            <div className="user-menu">
              <button
                className="user-btn"
                onClick={() => setOpenUser((v) => !v)}
              >
                👤 {user.email}
              </button>

              {openUser && (
                <>
                  <div
                    className="dropdown-backdrop"
                    onClick={() => setOpenUser(false)}
                  />

                  <div className="dropdown">
                    <button
                      className="dropdown-item logout"
                      onClick={() => {
                        logout();
                        setOpenUser(false);
                      }}
                    >
                      🚪 Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
