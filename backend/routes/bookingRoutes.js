const express = require("express");
const router = express.Router();
const {
  bookTicket,
  getBooking,
  cancelBooking,
  getUserBookings,
} = require("../controllers/bookingController");
const { roleProtect } = require("../middleware/auth");

router.get("/:id", roleProtect(["user"]), getBooking);
router.delete("/:id", roleProtect(["user"]), cancelBooking);

router.post("/", roleProtect(["user"]), bookTicket);
router.get("/user/:userId", roleProtect(["user"]), getUserBookings);

module.exports = router;
