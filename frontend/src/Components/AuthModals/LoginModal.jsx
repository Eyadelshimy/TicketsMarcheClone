import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import "./AuthModals.css";

const LoginModal = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { isLoginModalOpen, closeModals, openRegisterModal } = useModal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password, rememberMe);

      if (result.success) {
        closeModals(); // Close the modal after successful login
      } else {
        setError(result.message || "Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoginModalOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="auth-modal">
          <button className="close-button" onClick={closeModals}>
            ×
          </button>

          <h2>Login to Your Account</h2>
          <p className="auth-subtitle">Welcome back to TicketsMarche</p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
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

            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  id="rememberMe"
                  label="Remember Me"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                />
              </Col>
              <Col>
                <Link
                  to="/forgot-password"
                  className="float-end"
                  onClick={closeModals}
                >
                  Forgot Password?
                </Link>
              </Col>
            </Row>

            <button
              type="submit"
              className="btn btn-tm-primary btn-block"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-links">
            <p>
              Don't have an account?{" "}
              <button className="text-link" onClick={openRegisterModal}>
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

