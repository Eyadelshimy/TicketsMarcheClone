const express = require("express");
const {
  getUserProfile,
  putUserProfile,
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();
const { roleProtect } = require("../middleware/auth");

router.get("/profile", roleProtect(["user"]), getUserProfile);
router.put("/profile", roleProtect(["user"]), putUserProfile);

router.get("/", roleProtect(["admin"]), getAllUsers);

router.delete("/:id", roleProtect(["admin"]), deleteUser);
router.put("/:id", roleProtect(["admin"]), updateUser);
router.get("/:id", roleProtect(["admin"]), getUser);

module.exports = router;
