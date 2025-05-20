const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    userID: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    role: {
      type: String,
      enum: ["User", "Organizer", "Admin"],
      required: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
  },
);

userSchema.pre("save", function (next) {
  if (!this.userID) {
    this.userID = uuidv4();
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
