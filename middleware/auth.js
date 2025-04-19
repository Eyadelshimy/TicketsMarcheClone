const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.roleProtect = (roles) => {
  return async (req, res, next) => {
    var token;

    if (req.cookies["token"]) {
      token = req.cookies["token"];
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Token does not exist" });
    }

    var decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      res.status(401).json({ success: false, message: "Invalid token" });
    }

    try {
      req.user = await User.findOne({ userID: decoded.userID });
      if (
        roles.some((role) => role.toLowerCase() === req.user.role.toLowerCase())
      ) {
        next();
      } else res.status(401).json({ success: false, message: "Not Allowed (fck u)" });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  };
};
