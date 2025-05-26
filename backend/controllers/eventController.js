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
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find(); // Fetch all events from the database
      return res.status(200).json({ success: true, data: events });
    } catch (error) {
      return res.status(500).json({ success: false, error: "Server error" });
    }
  },

  getOrganizerEvents: async (req, res) => {
    try {
      const organizerId = req.params.organizerId;

      // Find all events where the organizer field matches the given ID
      const events = await Event.find({ organizer: organizerId }).sort({
        createdAt: -1,
      }); // Sort by creation date, newest first

      res.status(200).json({ success: true, data: events });
    } catch (error) {
      console.error("Error fetching organizer events:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  },

  getEvent: async (req, res) => {
    try {
      const event = await Event.find({ eventID: req.params.id });
      res.status(200).json(event);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  updateEvent: async (req, res) => {
    try {
      let event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({ success: true, data: event });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getApprovedEvents: async (req, res) => {
    try {
      let approvedEvents = await Event.find({ status: "Approved" });
      res.status(200).json({ success: true, data: approvedEvents });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      let event = await Event.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, data: event });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
