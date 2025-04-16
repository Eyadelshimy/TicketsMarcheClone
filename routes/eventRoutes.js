const express = require("express")
const { createEvent,getAllEvents, getEvent,deleteEvent, updateEvent} = require("../controllers/eventController");
const { roleProtect } =require("../middleware/auth");
const router = express.Router();


router.get("/:id", getEvent);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);

router.post("/",roleProtect(["organizer"]), createEvent);
router.get("/", getAllEvents);

 module.exports = router;