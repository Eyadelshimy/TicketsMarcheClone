const express = require("express");
const router = express.Router();
const {
  bookTicket,
  getBooking,
  cancelBooking,
  getUserBookings,
} = require("../controllers/bookingController");
const { protect, roleProtect } = require("../middleware/auth");

router.get("/:id", protect, roleProtect(["user"]), getBooking);
router.delete("/:id", protect, roleProtect(["user"]), cancelBooking);

router.post("/", protect, roleProtect(["user"]), bookTicket);
router.get("/user/:userId", protect, roleProtect(["user"]), getUserBookings);

module.exports = router;
