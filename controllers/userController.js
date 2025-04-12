const User = require("../models/User");

module.exports = {
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
                { new: true }
            );

            return res.status(200).json({ user, message: "User updated successfully" });
        }
        catch (err) {
            return res.status(500).json({ error: err });
        }
    }
}