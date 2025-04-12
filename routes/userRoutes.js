const express = require("express");
const { getUserProfile, putUserProfile} = require("../controllers/userController");
const router = express.Router();
const { roleProtect } = require("../middleware/auth");

router.get("/profile", roleProtect(["user"]), getUserProfile);
router.put("/profile", roleProtect(["user"]), putUserProfile);

module.exports = router;
