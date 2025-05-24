import React, { useState } from "react";
import { LoginForm } from "../LoginForm";
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
          <LoginForm
            error={error}
            handleSubmit={handleSubmit}
            email={formData.email}
            handleChange={handleChange}
            password={formData.password}
            rememberMe={rememberMe}
            handleCheckboxChange={handleCheckboxChange}
            closeModals={closeModals}
            loading={loading}
            openRegisterModal={openRegisterModal}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
