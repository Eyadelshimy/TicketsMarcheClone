const Booking = require("../models/Booking");
const Event = require("../models/Event");

module.exports = {
  bookTicket: async (req, res) => {
    try {
      let event = await Event.findOne({ _id: req.body.id });

      let numTickets = req.body.numTickets;

      let shieat = await Booking.insertOne({
        user: req.user._id,
        event: event._id,
        numberOfTickets: numTickets,
        totalPrice: event.ticketPricing * numTickets,
        status: "pending",
      });

      return res.status(200).json({ success: true, data: shieat });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  getUserBookings: async (req, res) => {
    try {
      const userId = req.params.userId;

      const bookings = await Booking.find({ user: userId })
        .populate({
          path: "event",
          select: "title date location ticketPricing image",
        })
        .sort({ createdAt: -1 })
        .lean();

      return res
        .status(200)
        .json({ success: true, data: JSON.parse(JSON.stringify(bookings)) });
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  getBooking: async (req, res) => {
    try {
      let booking = Booking.findOne({ bookingID: req.params.id });

      return res.status(200).json(booking);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  cancelBooking: async (req, res) => {
    try {
      let booking = await Booking.deleteOne({ bookingID: req.params.id });

      return res.status(200).json(booking);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};
