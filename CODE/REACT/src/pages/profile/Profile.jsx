import { useEffect, useState } from "react";
import "./Profile.css";
import { FiEdit2, FiEye, FiMail } from "react-icons/fi";

export default function Profile() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  useEffect(() => {

    setStudent({
      name: "Ankit Sharma",
      email: "ankit@email.com",
      mobile: "9876543210",
      password: "",
    });
  }, []);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log(student);
  };

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

        {/* <div className="field">
          <div className="label">
            <h4>Password</h4>
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              value={student.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
            <FiEye />
          </div>
        </div> */}

        <div className="buttons">
          <button className="cancel">Cancel</button>
          <button className="save" onClick={handleSave}>
            Save Changes
          </button>
        </div>

      </div>

    </div>
  );
}