import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getRoleIcon } from "../../utils/roleIcons";
import "../../assets/css/auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role is set to 'user'
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Submit to API
      const result = await register({
        name: formData.name,
        email: formData.email,
        profilePicture: "",
        password: formData.password,
        role: formData.role, // Include role in registration data
      });

      if (result.success) {
        // Redirect to homepage after successful registration and replace the current entry in history
        navigate("/", { replace: true });
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case "user":
        return "Browse events and purchase tickets";
      case "organizer":
        return "Create and manage your own events";
      case "admin":
        return "Full platform management access";
      default:
        return "";
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        <p className="auth-subtitle">
          Join TicketsMarche to explore amazing events
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Account Type</label>
            <div className="role-selection-wrapper">
              <div
                className={`role-option ${formData.role === "user" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, role: "user" })}
              >
                <div className="role-icon">{getRoleIcon("user")}</div>
                <div className="role-details">
                  <div className="role-name">User</div>
                  <div className="role-description">
                    {getRoleDescription("user")}
                  </div>
                </div>
              </div>

              <div
                className={`role-option ${formData.role === "organizer" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, role: "organizer" })}
              >
                <div className="role-icon">{getRoleIcon("organizer")}</div>
                <div className="role-details">
                  <div className="role-name">Organizer</div>
                  <div className="role-description">
                    {getRoleDescription("organizer")}
                  </div>
                </div>
              </div>

              <div
                className={`role-option ${formData.role === "admin" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, role: "admin" })}
              >
                <div className="role-icon">{getRoleIcon("admin")}</div>
                <div className="role-details">
                  <div className="role-name">Administrator</div>
                  <div className="role-description">
                    {getRoleDescription("admin")}
                  </div>
                </div>
              </div>
            </div>
            <input type="hidden" name="role" value={formData.role} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <button
            type="submit"
            className="btn btn-tm-primary btn-block"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
