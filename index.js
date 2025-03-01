const express = require("express");
const connectDB = require("./config/db");


const app = express();

const startServer = async () => {
    try {
        await connectDB();
        app.listen(5000, () => {
            console.log("🚀 Server is running on port 5000");
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
        process.exit(1);
    }
};

startServer();
