const Event = require("../models/Event");

module.exports = {
  createEvent: async (req, res) => {
    try {
      const {
        title,
        description,
        date,
        location,
        category,
        image,
        ticketPricing,
        totalTickets,
        remainingTickets,
        status,
      } = req.body;

      // Validate required fields
      if (
          !title ||
          !description ||
          !date ||
          !location ||
          !category ||
          !ticketPricing ||
          !totalTickets ||
          !remainingTickets ||
          !status
      ) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields",
        });
      }

      // Create the event with the organizer set to req.user._id
      const event = await Event.create({
        title,
        description,
        date,
        location,
        category,
        image,
        ticketPricing,
        totalTickets,
        remainingTickets,
        status,
        organizer: req.user._id,
      });

      res.status(201).json({ success: true, data: event });
    } catch (error) {
      // Handle validation errors
      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }

      // Server error
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find(); // Fetch all events from the database
      res.status(200).json({ success: true, data: events });
    } catch (error) {
      res.status(500).json({ success: false, error: "Server error" });
    }
  },
};