const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const router = express.Router();
const { roleProtect } = require("../middleware/auth");

router.get("/profile", roleProtect(["user"]), getUserProfile);

module.exports = router;
