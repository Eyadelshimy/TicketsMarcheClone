const express = require("express");
const { createEvent, getAllEvents } = require("../controllers/eventController");
const { roleProtect } = require("../middleware/auth");
const router = express.Router();

router.post("/", roleProtect(["organizer"]), createEvent);
router.get("/", getAllEvents); // Public route to get all events

module.exports = router;