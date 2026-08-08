import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authApi } from "../../auth/authApi";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    setStatus("loading");
    try {
      await authApi.resetPassword(token, newPassword);
      setStatus("done");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "4rem auto", padding: "1rem" }}>
      <h2>Reset Password</h2>

      {status === "done" ? (
        <p>Password reset successful. Redirecting to login...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            New Password
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              style={{ display: "block", width: "100%", marginBottom: "1rem" }}
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              style={{ display: "block", width: "100%", marginBottom: "1rem" }}
            />
          </label>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}

      <p style={{ marginTop: "1rem" }}>
        <Link to="/login">Back to login</Link>
      </p>
    </div>
  );
}