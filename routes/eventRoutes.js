const express = require("express");

const { createEvent } = require("../controllers/eventController");
const { roleProtect } = require("../middleware/auth");

const router = express.Router();

router.post("/", roleProtect(["organizer"]), createEvent);

module.exports = router;

