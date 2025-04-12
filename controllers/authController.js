const User = require("../models/User");
const { generateToken } = require("../jwtUtils");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, email, profilePicture, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: "false", message: "User already exists" });
    }

    let hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      profilePicture,
      password: hash,
      role: "User",
    });

    res.cookie("token", generateToken(newUser.toJSON()), {
      maxAge: 900000,
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user.toJSON());
    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
