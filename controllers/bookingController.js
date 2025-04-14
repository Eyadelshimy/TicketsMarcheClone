const Booking = require("../models/Booking");
const Event = require("../models/Event");

module.exports = {
  bookTicket: async (req, res) => {
    try {
      let event = await Event.findOne({ eventID: req.body.eventID });

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
};
