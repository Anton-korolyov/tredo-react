import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../auth/AuthContext";

export default function LoginForm({ onCancel }) {
  const { t } = useTranslation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      onCancel();
    } catch (err) {
      setError(t("invalidLogin"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card-form" onSubmit={submit}>
      <h2>{t("login")}</h2>

      <input
        type="email"
        placeholder={t("email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder={t("password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && (
        <div style={{ color: "#ff453a", fontSize: 13 }}>
          {error}
        </div>
      )}

      <div className="form-actions">
        <button
          type="submit"
          className="ios-btn primary"
          disabled={loading}
        >
          {loading ? t("loggingIn") : t("login")}
        </button>

        <button
          type="button"
          className="ios-btn secondary"
          onClick={onCancel}
          disabled={loading}
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  );
}
