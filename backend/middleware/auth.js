const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Separate authentication middleware
exports.protect = async (req, res, next) => {
  let token;

  if (req.cookies["token"]) {
    token = req.cookies["token"];
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // Allow token from Authorization header with Bearer scheme
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_super_secure_jwt_secret_key_here",
    );

    const user = await User.findOne({ userID: decoded.userID });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Add the user to the request object
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

// Role-based authorization middleware
exports.roleProtect = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        success: false,
        message: "Server error: User authentication required before role check",
      });
    }

    // If no specific roles are required or if the array is empty, proceed to the next middleware
    if (!roles || roles.length === 0) {
      return next();
    }

    // Check if user role is included in the allowed roles (case insensitive)
    const userRole = (req.user.role || "").toLowerCase();
    const hasRequiredRole = roles.some(
      (role) => role.toLowerCase() === userRole,
    );

    if (hasRequiredRole) {
      return next();
    } else {
      console.log(
        `Access denied for user with role ${req.user.role}, required roles: ${roles.join(", ")}`,
      );
      return res.status(403).json({
        success: false,
        message: "Insufficient permissions",
      });
    }
  };
};
