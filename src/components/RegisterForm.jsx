import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../auth/AuthContext";
import "./RegisterForm.css";

export default function RegisterForm({ onCancel, onSwitchToLogin }) {
  const { t } = useTranslation();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== repeat) {
      setError(t("passwordsNotMatch"));
      return;
    }

    try {
      setLoading(true);
      await register(email, password);
      onCancel();
    } catch (err) {
      setError(err.message || t("registerFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <h2>{t("createAccount")}</h2>

      {error && <div className="form-error">{error}</div>}

      <input
        placeholder={t("email")}
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder={t("password")}
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder={t("repeatPassword")}
        value={repeat}
        onChange={e => setRepeat(e.target.value)}
        required
      />

      <div className="form-actions">
        <button className="ios-btn primary" disabled={loading}>
          {loading ? t("creating") : t("register")}
        </button>

        <button
          type="button"
          className="ios-btn secondary"
          onClick={onCancel}
        >
          {t("cancel")}
        </button>
      </div>

      <p className="form-hint">
        {t("alreadyHaveAccount")}{" "}
        <button type="button" onClick={onSwitchToLogin}>
          {t("login")}
        </button>
      </p>
    </form>
  );
}
