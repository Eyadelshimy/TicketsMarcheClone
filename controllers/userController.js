const User = require("../models/User");
const Booking = require("../models/Booking");

module.exports = {
  //get
  getAllUsers: async (_, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  //get
  getUser: async (req, res) => {
    try {
      const user = await userModel.findOne({ userID: req.params.id });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  //put
  updateUser: async (req, res) => {
    try {
      const user = await userModel.findOneAndUpdate(
        { userID: req.params.id },
        { role: req.body.role },
        { new: true },
      );

      res.status(200).json({ user, message: "User updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  //delete
  deleteUser: async (req, res) => {
    try {
      const user = await userModel.findOneAndDelete(
        { userID: req.params.id },
        { new: true },
      );
      res.status(200).json({ user, message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  getUserProfile: async (req, res) => {
    return res.status(200).json({
      success: true,
      data: req.user,
    });
  },
  putUserProfile: async (req, res) => {
    try {
      let update = req.body;

      if (update.hasOwnProperty("password")) {
        delete update.password;
      }

      if (update.hasOwnProperty("userID")) {
        delete update.userID;
      }

      if (update.hasOwnProperty("role")) {
        delete update.role;
      }

      const user = await User.findOneAndUpdate(
        { userID: req.user.userID },
        update,
        { new: true },
      );

      return res
        .status(200)
        .json({ user, message: "User updated successfully" });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  getUserBookings: async (req, res) => {
    try {
      let bookings = await Booking.find().populate("user").populate("event");
      // bookings = bookings.filter((b) => b.user);

      return res.status(200).json({ success: true, bookings: bookings });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};
