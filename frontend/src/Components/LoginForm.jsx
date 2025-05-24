import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import "./AuthModals/AuthModals.css";

export function LoginForm({
  error,
  handleSubmit,
  email,
  handleChange,
  password,
  rememberMe,
  handleCheckboxChange,
  closeModals,
  loading,
  openRegisterModal,
}) {
  return (
    <div>
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
            value={email}
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
            value={password}
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
  );
}
