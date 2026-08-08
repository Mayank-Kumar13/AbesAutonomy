import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { FiEdit2, FiMail } from "react-icons/fi";
import { authApi, isLoggedIn, clearAuth } from "../../services/api";

export default function Profile() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const result = await authApi.getProfile();
        if (result.data) {
          setStudent({
            name: result.data.name || "",
            email: result.data.email || "",
            mobile: result.data.mobile || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        if (err.status === 401) {
          clearAuth();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
    setMessage("");
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const result = await authApi.updateProfile(student);
      if (result.data) {
        setStudent({
          name: result.data.name || "",
          email: result.data.email || "",
          mobile: result.data.mobile || "",
        });
      }
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    authApi.logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="profile-page">
        <p style={{ color: "#888", textAlign: "center", paddingTop: "80px" }}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <h1 className="page-title">Profile</h1>
      <p className="page-subtitle">
        Manage your personal information and account settings.
      </p>

      <div className="profile-card">

        <div className="profile-header">
          <div className="profile-left">
            <div className="avatar">
              {student.name
                ? student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "?"}
            </div>

            <div>
              <h2>{student.name}</h2>

              <div className="email-line">
                <FiMail />
                <span>{student.email}</span>
              </div>
            </div>
          </div>
        </div>

        <hr />

        {message && (
          <p style={{
            color: message.includes("success") ? "#66bb6a" : "#e57373",
            fontSize: "14px",
            textAlign: "center",
            margin: "10px 0",
          }}>
            {message}
          </p>
        )}

        <div className="field">
          <div className="label">
            <h4>Full Name</h4>
          </div>

          <div className="input-box">
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
            />
            <FiEdit2 />
          </div>
        </div>

        <div className="field">
          <div className="label">
            <h4>Email Address</h4>
          </div>

          <div className="input-box">
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
            />
            <FiEdit2 />
          </div>
        </div>

        <div className="field">
          <div className="label">
            <h4>Mobile Number</h4>
          </div>

          <div className="input-box">
            <input
              type="text"
              name="mobile"
              value={student.mobile}
              onChange={handleChange}
            />
            <FiEdit2 />
          </div>
        </div>

        <div className="buttons">
          <button className="cancel" onClick={handleLogout}>Logout</button>
          <button className="save" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>

    </div>
  );
}