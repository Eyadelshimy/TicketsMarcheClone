const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const eventRouter = require("./routes/eventRoutes");

require("./models/User");
require("./models/Event");
require("./models/Booking");

const app = express();

// Enable CORS
app.use(cors({
    origin: "http://localhost:5173", // Update this to match your frontend URL
    credentials: true, // Allow cookies to be sent with requests
}));

app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use("/api/v1/events", eventRouter);
app.use("/api/v1", authRouter); 
app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/bookings", require("./routes/bookingRoutes"));

module.exports = app;
