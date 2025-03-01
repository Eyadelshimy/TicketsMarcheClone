const mongoose = require("mongoose");
const User = require("../models/User");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/TicketsMarcheDB")
    .then(() => {
        console.log("Connected to MongoDB");

        // Create a test user
        const testUser = new User({
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
            profilePicture: "profilePicUrl",
            role: "User"
        });

        // Save the user
        testUser.save()
            .then(() => {
                console.log("User created successfully");
                mongoose.connection.close(); // Close the connection after saving
            })
            .catch((err) => {
                if (err.code === 11000) {
                    console.error("Error: Duplicate email");
                } else {
                    console.error("Error creating user:", err);
                }
                mongoose.connection.close();
            });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });