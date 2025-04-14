const express = require("express")
const { createEvent } = require("../controllers/eventController");
const { roleProtect } =require("../middleware/auth");
 const router = express.Router();
 router.post("/",roleProtect(["EventOrganizer"]), createEvent);

 module.exports = router;