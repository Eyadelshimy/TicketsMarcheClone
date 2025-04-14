const express = require("express")
const { createEvent,getAllEvents } = require("../controllers/eventController");
const { roleProtect } =require("../middleware/auth");
 const router = express.Router();

router.get("/", getAllEvents);
 router.post("/",roleProtect(["organizer"]), createEvent);

 module.exports = router;