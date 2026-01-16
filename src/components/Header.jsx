import "./Header.css";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";

export default function Header({
  onAdd,
  onLogin,
  onRegister,
  search,
  city,
  onSearchChange,
  onCityChange,
}) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        {/* LOGO */}
        <div className="logo">YadCard</div>

        {/* SEARCH */}
        <div className="search-box">
          <input
            type="text"
            placeholder="What are you selling?"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />

          <select
            className="city-select"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
          >
            <option value="">All cities</option>
            <option value="Haifa">Haifa</option>
            <option value="Tel Aviv">Tel Aviv</option>
            <option value="Jerusalem">Jerusalem</option>
            <option value="Krayot">Krayot</option>
          </select>
        </div>

        {/* ADD CARD */}
        <button
          className="btn add"
          onClick={() => {
            setOpen(false);
            onAdd();
          }}
        >
          ➕ Add card
        </button>

        {/* AUTH AREA */}
        <div className="auth-buttons">
          {!user && (
            <>
              <button className="btn secondary" onClick={onLogin}>
                Login
              </button>

              <button className="btn primary" onClick={onRegister}>
                Register
              </button>
            </>
          )}

          {user && (
            <div className="user-menu">
              <button
                className="user-btn"
                onClick={() => setOpen((v) => !v)}
              >
                👤 {user.email}
              </button>

              {open && (
                <>
                  <div
                    className="dropdown-backdrop"
                    onClick={() => setOpen(false)}
                  />

                  <div className="dropdown">
                    <button
                      className="dropdown-item logout"
                      onClick={() => {
                        logout();
                        setOpen(false);
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
