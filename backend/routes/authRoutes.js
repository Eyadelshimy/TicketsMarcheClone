const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const router = express.Router();
const { roleProtect } = require("../middleware/auth");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;
