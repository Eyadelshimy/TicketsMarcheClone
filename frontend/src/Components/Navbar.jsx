// Components/Navbar.jsx
import {
  Navbar as BSNavbar,
  Nav,
  Container,
  Form,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";

import { FaSearch, FaRegUserCircle } from "react-icons/fa";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import "../assets/css/fonts.css";
import "../assets/css/navbar.css";
import Logo from "../assets/svg/TicketsMarche.svg";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { openLoginModal, openRegisterModal, closeModals } = useModal();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
    <BSNavbar
      bg="light"
      expand="lg"
      className="shadow-lg m-4"
      style={{
        borderRadius: "25px",
        width: "97%",
      }}
      fixed="top"
    >
      <Container
        fluid
        className="d-flex justify-content-between align-middle px-2 mx-3 py-2 my-1"
      >
        <BSNavbar.Brand as={Link} className="col-lg-3 me-0" to="/">
          <img src={Logo} alt="Logo" width="193" height="20" />
        </BSNavbar.Brand>

        <div
          className="position-absolute start-50 translate-middle-x"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <Form
            align="center"
            className="d-inline-flex justify-content-center align-items-center"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/events", {
                state: { search: searchTerm.trim().toLowerCase() },
              });
            }}
          >
            <Row>
              <Col
                xs="auto"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaSearch />
              </Col>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  style={{ border: "none", boxShadow: "none" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
            </Row>
          </Form>
        </div>

        {/* Right - Links and Profile */}
        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/events">
            Events
          </Nav.Link>

          <Dropdown
            show={showDropdown}
            onToggle={handleProfileClick}
            align="end"
          >
            <Dropdown.Toggle
              as="button"
              className="user-dropdown btn btn-light border-0 p-0 bg-transparent ml-2"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaRegUserCircle size={25} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {isAuthenticated ? (
                <>
                  <Dropdown.Header>Welcome, {user?.name}</Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => handleMenuItemClick("/profile")}
                  >
                    My Profile
                  </Dropdown.Item>

                  {hasRole("organizer") && (
                    <>
                      <Dropdown.Item
                        onClick={() => handleMenuItemClick("/my-events")}
                      >
                        My Events
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleMenuItemClick("/create-event")}
                      >
                        Create Event
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleMenuItemClick("/event-analytics")}
                      >
                        Event Analytics
                      </Dropdown.Item>
                    </>
                  )}

                  {hasRole("admin") && (
                    <>
                      <Dropdown.Divider />
                      <Dropdown.Header>Admin</Dropdown.Header>
                      <Dropdown.Item
                        onClick={() => handleMenuItemClick("/admin/users")}
                      >
                        User Management
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleMenuItemClick("/admin/events")}
                      >
                        Event Management
                      </Dropdown.Item>
                    </>
                  )}

                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    Logout
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item onClick={handleOpenLoginModal}>
                    Login
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleOpenRegisterModal}>
                    Sign Up
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </BSNavbar>
  );
}
