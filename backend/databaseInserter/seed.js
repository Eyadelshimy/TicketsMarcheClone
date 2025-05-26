// Seed.js
const mongoose = require("mongoose");
const Event = require("../models/Event"); // Adjust the path to your Event model
const fs = require("fs");
const path = require("path");

class Seed {
  constructor() {
    this.eventsFilePath = path.join(__dirname, "events.json");
    this.events = JSON.parse(fs.readFileSync(this.eventsFilePath, "utf-8"));
  }

  parseDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error(`Invalid date: ${dateString}`);
      return new Date(); // Default to current date
    }
    return date;
  }

  parsePrice(priceString) {
    const price = parseFloat(priceString.replace("$", ""));
    if (isNaN(price)) {
      console.error(`Invalid price: ${priceString}`);
      return 0; // Default to 0
    }
    return price;
  }

  async seedDatabase() {
    try {
      const organizerId = new mongoose.Types.ObjectId("6682c1c2e5b0c47fa8576490");

      const eventDocs = this.events.map((e) => ({
        title: e["event-name"],
        description: e["event-description"] || "Placeholder Description",
        date: this.parseDate(e["event-date"]),
        location: e["event-venue"],
        category: e["event-category"] || "General",
        image: e["category_img"],
        ticketPricing: this.parsePrice(e["event-price"]),
        totalTickets: e["total-tickets"] || 100,
        remainingTickets: e["remaining-tickets"] || 100,
        status: e["status"] || "Approved",
        organizer: organizerId,
      }));

      await Event.insertMany(eventDocs);
      console.log("✅ Events inserted successfully.");
    } catch (err) {
      console.error("❌ Error inserting events:", err);
    } finally {
      mongoose.connection.close();
    }
  }

  async connectAndSeed() {
    try {
      await mongoose.connect("mongodb://localhost:27017/TicketsMarcheDB");
      console.log("Connected to MongoDB");
      await this.seedDatabase();
    } catch (err) {
      console.error("❌ MongoDB connection error:", err);
    }
  }
}

module.exports = Seed;