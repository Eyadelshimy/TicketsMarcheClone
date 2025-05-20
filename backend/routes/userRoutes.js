const express = require("express");
const {
  getUserBookings,
  getUserProfile,
  putUserProfile,
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
  getUserEvents,
  getUserEventsAnalytics
} = require("../controllers/userController");

const router = express.Router();
const auth = require("../middleware/auth");

// Get all users - admin only
router.get("/", auth.protect, auth.roleProtect(["admin"]), getAllUsers);

// User-specific routes
router.get("/me", auth.protect, auth.roleProtect(["user", "admin", "organizer"]), getUserProfile);
router.get("/profile", auth.protect, auth.roleProtect(["user", "admin", "organizer"]), getUserProfile);
router.put("/profile", auth.protect, auth.roleProtect(["user", "admin", "organizer"]), putUserProfile);
router.get("/bookings", auth.protect, auth.roleProtect(["user", "admin", "organizer"]), getUserBookings);
router.get("/events/analytics", auth.protect, auth.roleProtect(["organizer", "admin"]), getUserEventsAnalytics);
router.get("/events", auth.protect, auth.roleProtect(["organizer", "admin"]), getUserEvents);

// Admin-only routes for user management
router.delete("/:id", auth.protect, auth.roleProtect(["admin"]), deleteUser);
router.put("/:id", auth.protect, auth.roleProtect(["admin"]), updateUser);
router.get("/:id", auth.protect, auth.roleProtect(["admin"]), getUser);

module.exports = router;