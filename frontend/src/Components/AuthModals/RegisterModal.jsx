import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import "./AuthModals.css";

const RegisterModal = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role is set to 'user'
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { isRegisterModalOpen, closeModals, openLoginModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
        password: formData.password,
        role: formData.role, // Include role in registration data
      });

      if (result.success) {
        closeModals(); // Close modal after successful registration
        // Navigate to homepage
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

  // Get role icon based on selected role
  const getRoleIcon = (role) => {
    switch (role) {
      case "user":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 20C18 17.7909 15.3137 16 12 16C8.68629 16 6 17.7909 6 20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "organizer":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21M5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12V16M9 12H15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "admin":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 12L11 14L15 10M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
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

  if (!isRegisterModalOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="auth-modal">
          <button className="close-button" onClick={closeModals}>
            ×
          </button>

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
                  onClick={() =>
                    setFormData({ ...formData, role: "organizer" })
                  }
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
              Already have an account?{" "}
              <button className="text-link" onClick={openLoginModal}>
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;

