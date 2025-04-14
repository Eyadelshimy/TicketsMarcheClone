const express = require("express");
const router = express.Router();
const { bookTicket } = require("../controllers/bookingController");
const { roleProtect } = require("../middleware/auth");

router.post("/", roleProtect(["user"]), bookTicket);

module.exports = router;
