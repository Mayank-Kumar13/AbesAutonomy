import { useState } from "react";
import { Link } from "react-router-dom";
import { authApi } from "../../auth/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("loading");
    try {
      await authApi.forgotPassword(email);
      setStatus("sent");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "4rem auto", padding: "1rem" }}>
      <h2>Forgot Password</h2>

      {status === "sent" ? (
        <p>If that email exists, a reset link has been sent. Check your inbox.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ display: "block", width: "100%", marginBottom: "1rem" }}
            />
          </label>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send reset link"}
          </button>
        </form>
      )}

      <p style={{ marginTop: "1rem" }}>
        <Link to="/login">Back to login</Link>
      </p>
    </div>
  );
}