import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import "./RegisterForm.css";
export default function RegisterForm({ onCancel, onSwitchToLogin }) {
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
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await register(email, password); // 👈 API
      onCancel(); // закрываем popup
    } catch (err) {
      setError(err.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <h2>Create account</h2>

      {error && <div className="form-error">{error}</div>}

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Repeat password"
        value={repeat}
        onChange={e => setRepeat(e.target.value)}
        required
      />

      <div className="form-actions">
        <button className="ios-btn primary" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

        <button
          type="button"
          className="ios-btn secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>

      <p className="form-hint">
        Already have an account?{" "}
        <button type="button" onClick={onSwitchToLogin}>
          Login
        </button>
      </p>
    </form>
  );
}
