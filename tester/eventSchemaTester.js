const mongoose = require("mongoose");
const Event = require("../models/Event");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/TicketsMarcheDB")
    .then(() => {
        console.log("Connected to MongoDB");

        // Create a test event
        const testEvent = new Event({
            title: "Test Event",
            description: "This is a test event",
            date: new Date(),
            location: "Test Location",
            category: "Test Category",
            image: "test.jpg",
            ticketPricing: 100,
            totalTickets: 50,
            remainingTickets: 50,
            organizer: new mongoose.Types.ObjectId()
        });

        // Save the event
        testEvent.save()
            .then(() => {
                console.log("Event created successfully");
                mongoose.connection.close(); // Close the connection after saving
            })
            .catch((err) => {
                console.error("Error creating event:", err);
                mongoose.connection.close();
            });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });