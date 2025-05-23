// Components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import "../assets/css/fonts.css";
import "../assets/css/buttons.css";
import "../assets/css/navbar.css";
import Logo from "../assets/svg/TicketsMarche.svg";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { openLoginModal, openRegisterModal, closeModals } = useModal();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Add this effect to close dropdown when auth state changes
  useEffect(() => {
    setShowDropdown(false);
  }, [isAuthenticated]);

  const handleProfileClick = () => {
    // Toggle dropdown menu always
    setShowDropdown(!showDropdown);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  const handleLogout = async () => {
    // First close any open dropdowns
    setShowDropdown(false);
    // Close any open modals
    closeModals();
    // Then logout the user
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Handle login modal with dropdown closing
  const handleOpenLoginModal = () => {
    setShowDropdown(false);
    openLoginModal();
  };

  // Handle register modal with dropdown closing
  const handleOpenRegisterModal = () => {
    setShowDropdown(false);
    openRegisterModal();
  };

  // Helper function to check user role
  const hasRole = (role) => {
    return user?.role?.toLowerCase() === role.toLowerCase();
  };

  return (
    <div className="navbar-container">
      <nav className="tm-navbar">
        <div className="container-fluid">
          <div className="navbar-left">
            <Link className="navbar-brand" to="/">
              <img src={Logo} alt="Logo" width="180" height="54" />
            </Link>
          </div>

          <div className="navbar-center">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
              />
              <button className="search-button">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="6"
                    stroke="black"
                    strokeWidth="1.5"
                  />
                  <path d="M14 14L17 17" stroke="black" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
          </div>

          <div className="navbar-right">
            <Link to="/events" className="nav-link">
              Events
            </Link>
            <div className="profile-dropdown">
              <button
                onClick={handleProfileClick}
                className="nav-link profile-link"
              >
                <svg
                  width="32"
                  height="32"
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
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  {isAuthenticated ? (
                    <>
                      <span className="welcome-text">
                        Welcome, {user?.name}
                      </span>
                      <div className="dropdown-divider"></div>

                      {/* Common user links */}
                      <button
                        onClick={() => handleMenuItemClick("/profile")}
                        className="dropdown-item"
                      >
                        My Profile
                      </button>

                      {/* Organizer-specific links */}
                      {hasRole("organizer") && (
                        <>
                          <button
                            onClick={() => handleMenuItemClick("/my-events")}
                            className="dropdown-item"
                          >
                            My Events
                          </button>
                          <button
                            onClick={() => handleMenuItemClick("/create-event")}
                            className="dropdown-item"
                          >
                            Create Event
                          </button>
                          <button
                            onClick={() =>
                              handleMenuItemClick("/event-analytics")
                            }
                            className="dropdown-item"
                          >
                            Event Analytics
                          </button>
                        </>
                      )}

                      {/* Admin-specific links */}
                      {hasRole("admin") && (
                        <>
                          <div className="dropdown-divider"></div>
                          <span className="dropdown-header">Admin</span>
                          <button
                            onClick={() => handleMenuItemClick("/admin/users")}
                            className="dropdown-item"
                          >
                            User Management
                          </button>
                          <button
                            onClick={() => handleMenuItemClick("/admin/events")}
                            className="dropdown-item"
                          >
                            Event Management
                          </button>
                        </>
                      )}

                      <div className="dropdown-divider"></div>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item logout-item"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleOpenLoginModal}
                        className="dropdown-item"
                      >
                        Login
                      </button>
                      <div className="dropdown-divider"></div>
                      <button
                        onClick={handleOpenRegisterModal}
                        className="dropdown-item"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
