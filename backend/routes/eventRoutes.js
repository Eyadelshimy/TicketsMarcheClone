const express = require("express");
const {
  createEvent,
  getApprovedEvents,
  getEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
  getOrganizerEvents,
} = require("../controllers/eventController");

const { roleProtect, protect } = require("../middleware/auth");
const router = express.Router();

router.get(
  "/organizer/:organizerId",
  protect,
  roleProtect(["organizer"]),
  getOrganizerEvents,
);

router.get("/all", protect, roleProtect(["admin"]), getAllEvents);

router.post("/", protect, roleProtect(["organizer"]), createEvent);
router.get("/", getApprovedEvents);

router.get("/:id", getEvent);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);

module.exports = router;
