const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        profilePicture: { type: String, required: true },
        role: { type: String, enum: ["User", "Organizer", "Admin"], required: true },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
