const Event =require("../models/Event");

createEvent: async (req, res) => {
    try {
        // Validate required fields
        const { name, date, location } = req.body;
        if (!name || !date || !location) {
            return res.status(400).json({
                success: false,
                error: "Missing required fields: name, date, or location",
            });
        }

        // Create the event
        const event = await Event.create(req.body);
        res.status(201).json({ success: true, data: event });
    } catch (error) {
        // Handle validation errors
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                error: error.message,
            });
        }

        // Handle other errors
        res.status(500).json({ success: false, error: "Server error" });
    }
}