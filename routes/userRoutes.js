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
const { roleProtect } = require("../middleware/auth");

router.get("/events/analytics", roleProtect(["organizer"]), getUserEventsAnalytics);
router.get("/events", roleProtect(["organizer"]), getUserEvents);


router.get("/profile", roleProtect(["user"]), getUserProfile);
router.put("/profile", roleProtect(["user"]), putUserProfile);

router.get("/bookings", roleProtect(["user"]), getUserBookings);

router.delete("/:id", roleProtect(["admin"]), deleteUser);
router.put("/:id", roleProtect(["admin"]), updateUser);
router.get("/:id", roleProtect(["admin"]), getUser);

router.get("/", roleProtect(["admin"]), getAllUsers);

module.exports = router;
