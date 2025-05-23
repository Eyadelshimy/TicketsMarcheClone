const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const bookingSchema = new mongoose.Schema(
  {
    bookingID: { type: String, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    numberOfTickets: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      required: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
  },
);

bookingSchema.pre("save", function (next) {
  if (!this.bookingID) {
    this.bookingID = uuidv4();
  }
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
