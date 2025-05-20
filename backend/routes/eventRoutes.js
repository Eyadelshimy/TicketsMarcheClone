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

const { roleProtect } = require("../middleware/auth");
const router = express.Router();

router.get("/:id", getEvent);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);

router.post("/", roleProtect(["organizer"]), createEvent);
router.get("/", getApprovedEvents);
router.get("/all", roleProtect(["admin"]), getAllEvents);
router.get("/organizer/:organizerId", roleProtect(["organizer"]), getOrganizerEvents);

module.exports = router;

