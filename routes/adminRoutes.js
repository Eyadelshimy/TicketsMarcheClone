const express = require("express");
const adminController = require("../controllers/adminController.js");
const {roleProtect} = require("../middleware/auth.js");
const router = express.Router();

router.get("/users",roleProtect(['admin']), adminController.getAllUsers);

router.get("/users/:id",roleProtect(['admin']), adminController.getUser);

router.put("/users/:id",roleProtect(['admin']), adminController.updateUser);

router.delete("/users/:id",roleProtect(['admin']), adminController.deleteUser)

module.exports = router;
