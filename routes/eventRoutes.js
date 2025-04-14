const express = require("express")
const { createEvent,getAllEvents, getEvent } = require("../controllers/eventController");
const { roleProtect } =require("../middleware/auth");
const router = express.Router();


router.get("/:id", getEvent);
router.put("/:id", getEvent);

router.get("/", getAllEvents);
router.post("/",roleProtect(["organizer"]), createEvent);

 module.exports = router;