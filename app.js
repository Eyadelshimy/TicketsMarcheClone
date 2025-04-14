const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const eventRouter = require("./routes/eventRoutes");

require("./models/User");
require("./models/Event");
require("./models/Booking");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/events", eventRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1/users", require("./routes/userRoutes"));

module.exports = app;
