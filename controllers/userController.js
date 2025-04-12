const User = require("../models/User");

module.exports = {
    getUserProfile: async (req, res) => {
        return res.status(200).json({
            success: true,
            data: req.user,
        });
    }
}