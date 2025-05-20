const User = require("../models/User");
const Event = require("../models/Event");
const Booking = require("../models/Booking");

module.exports = {
    //get
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().select('-password');
            res.status(200).json({
                success: true,
                count: users.length,
                data: users
            });
        } catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({
                success: false,
                message: 'Server error, could not fetch users'
            });
        }
    },

    //get
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).select('-password');

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                data: user
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message || 'Error fetching user'
            });
        }
    },

    //put
    updateUser: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                { role: req.body.role },
                { new: true, runValidators: true }
            ).select('-password');

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                data: user,
                message: "User updated successfully"
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message || 'Error updating user'
            });
        }
    },

    //delete
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                data: user,
                message: "User deleted successfully"
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message || 'Error deleting user'
            });
        }
    },

    getUserProfile: async (req, res) => {
        try {
            // Get the full user object from the database with all properties
            const user = await User.findById(req.user._id).select('-password');

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    _id: user._id,
                    userID: user.userID,
                    name: user.name,
                    email: user.email,
                    role: user.role, // Ensure role is included
                    profilePicture: user.profilePicture,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch user profile'
            });
        }
    },

    putUserProfile: async (req, res) => {
        try {
            const { name, email, profilePicture } = req.body;

            const updateFields = {};
            if (name) updateFields.name = name;
            if (email) updateFields.email = email;
            if (profilePicture) updateFields.profilePicture = profilePicture;

            const user = await User.findByIdAndUpdate(
                req.user._id,
                updateFields,
                { new: true, runValidators: true }
            ).select('-password');

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            return res.status(200).json({
                success: true,
                data: user,
                message: "Profile updated successfully"
            });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    },

    getUserBookings: async (req, res) => {
        try {
            let bookings = await Booking.find({user: req.user._id})
                .populate("user", "-password")
                .populate("event");

            return res.status(200).json({success: true, data: bookings});
        } catch (error) {
            return res.status(500).json({success: false, message: error.message});
        }
    },

    getUserEvents: async (req, res) => {
        try {
            let events = await Event.find({organizer: req.user._id}, "title description date location category image")
            return res.status(200).json({
                success: true,
                count: events.length,
                data: events
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    getUserEventsAnalytics: async (req, res) => {
        try {
            let events = await Event.find({organizer: req.user._id}, "title date location ticketPricing remainingTickets status organizer")

            return res.status(200).json({
                success: true,
                count: events.length,
                data: events
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
};