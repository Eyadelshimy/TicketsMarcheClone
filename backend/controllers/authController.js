const User = require("../models/User");
const { generateToken } = require("../jwtUtils");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, email, profilePicture, password, role } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Validate role - default to "User" if invalid or not provided
    const validRoles = ["user", "organizer", "admin"];
    const normalizedRole = role ? role.toLowerCase() : "user";

    let userRole;
    if (validRoles.includes(normalizedRole)) {
      // Properly capitalize the role
      userRole =
        normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1);
    } else {
      userRole = "User";
    }

    let hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      profilePicture: profilePicture || "",
      password: hash,
      role: userRole,
    });

    const token = generateToken(newUser.toJSON());

    // Standard session cookie - 15 minutes
    res.cookie("token", token, {
      maxAge: 900000, // 15 minutes
      httpOnly: false,
      sameSite: "None",
      secure: true,
    });

    return res.status(201).json({
      success: true,
      data: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profilePicture: newUser.profilePicture,
      },
      token: token, // Send token to client for localStorage if needed
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user.toJSON());

    // Set cookie expiration based on "Remember Me" option
    const cookieOptions = {
      httpOnly: false,
      sameSite: "None",
      secure: true,
      maxAge: 900000,
    };

    if (rememberMe) {
      cookieOptions.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
    } else {
      cookieOptions.maxAge = 900000; // 15 minutes
    }

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      },
      token: rememberMe ? token : undefined, // Only send token for localStorage if rememberMe is true
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add logout function
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
