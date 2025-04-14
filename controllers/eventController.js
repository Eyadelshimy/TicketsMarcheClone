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

      //server error
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

