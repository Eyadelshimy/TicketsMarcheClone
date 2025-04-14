const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventID: { type: String, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    ticketPricing: { type: Number, required: true },
    totalTickets: { type: Number, required: true },
    remainingTickets: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Approved", "Pending", "Declined"],
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
  },
);

eventSchema.pre("save", function (next) {
  if (!this.eventID) {
    this.eventID = uuidv4();
  }
  next();
});

module.exports = mongoose.model("Event", eventSchema);
