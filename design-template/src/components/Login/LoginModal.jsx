import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Login.module.css";

const LoginModal = ({ show, onClose, onAuth }) => {
  const [mode, setMode] = useState("login"); // 'login' or 'create'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("Logging in");
    try {
      const endpoint =
        mode === "login"
          ? `${backendUrl}/api/login`
          : `${backendUrl}/api/create-account`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // important for cookies
      });
      console.log("res", res);
      const data = await res.json();
      console.log("Response data from login:", data);
      if (!res.ok) throw new Error(data.error || "Unknown error");
      // After successful login/create, fetch the user's info and pass it to onAuth
      try {
        const meRes = await fetch(`${backendUrl}/api/me`, {
          credentials: "include",
        });
        if (meRes.ok) {
          const meData = await meRes.json();
          onAuth && onAuth(meData.user);
        } else {
          // fallback: pass minimal data if /me failed
          onAuth && onAuth({ userId: data.userId });
        }
      } catch (err) {
        console.warn("Could not fetch /api/me after auth:", err);
        onAuth && onAuth({ userId: data.userId });
      }

      // show a tiny success message for account creation
      if (mode === "create") {
        setSuccess("Account created — you are now logged in.");
        // keep modal open briefly so user sees confirmation
        setTimeout(() => {
          setSuccess("");
          onClose();
        }, 900);
      } else {
        onClose();
      }
    } catch (err) {
      console.log("Error", err, err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.modalTitle}>
          {mode === "login" ? "Login" : "Create Account"}
        </h2>
        <form onSubmit={handleSubmit} className={styles.formRowLayout}>
          <div className={styles.inputRow}>
            <label className={styles.inputLabel}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className={styles.inputField}
              placeholder="you@email.com"
            />
          </div>
          <div className={styles.inputRow}>
            <label className={styles.inputLabel}>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.inputField}
                placeholder="••••••••"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}
          <div className={styles.buttonRow}>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Login"
                : "Create Account"}
            </button>
          </div>
        </form>
        <div className={styles.switchMode}>
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setMode("create")}
                className={styles.linkBtn}
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className={styles.linkBtn}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
