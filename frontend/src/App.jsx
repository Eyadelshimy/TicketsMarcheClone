// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import HomePage from "./Pages/HomePage";
import EventsPage from "./Pages/EventsPage";
import EventDetailsPage from "./Pages/EventDetailsPage";
import EditEvent from "./Pages/EditEvent";
import ProfilePage from "./Pages/ProfilePage";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import { LoginModal, RegisterModal } from "./Components/AuthModals";
import ProtectedRoute from "./Components/ProtectedRoute";
import UnauthorizedPage from "./Pages/UnauthorizedPage";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import EventAnalytics from "./Pages/Organizer/EventAnalytics";

// User pages - removed MyBookings import since it's redundant with profile page

// Organizer pages
import MyEvents from "./Pages/Organizer/MyEvents";
import CreateEvent from "./Pages/Organizer/CreateEvent";

// Admin pages
import UserManagement from "./Pages/Admin/UserManagement";
import EventManagement from "./Pages/Admin/EventManagement";

import { CookiesProvider } from "react-cookie";

import "./App.css";

function App() {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <ModalProvider>
        <AuthProvider>
          <>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="events/:eventId" element={<EventDetailsPage />} />
                <Route path="unauthorized" element={<UnauthorizedPage />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route
                  path="reset-password/:token"
                  element={<ResetPassword />}
                />

                {/* Protected routes for authenticated users only */}
                <Route element={<ProtectedRoute />}>
                  <Route path="profile" element={<ProfilePage />} />
                </Route>

                {/* Routes for specific user roles - removed redundant MyBookings route */}

                <Route
                  element={<ProtectedRoute allowedRoles={["organizer"]} />}
                >
                  <Route path="my-events" element={<MyEvents />} />
                  <Route path="edit-event/:eventId" element={<EditEvent />} />
                  <Route path="create-event" element={<CreateEvent />} />
                  <Route path="event-analytics" element={<EventAnalytics />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                  <Route path="admin/users" element={<UserManagement />} />
                  <Route path="admin/events" element={<EventManagement />} />
                </Route>
              </Route>
            </Routes>
            <LoginModal />
            <RegisterModal />
          </>
        </AuthProvider>
      </ModalProvider>
    </CookiesProvider>
  );
}

export default App;
