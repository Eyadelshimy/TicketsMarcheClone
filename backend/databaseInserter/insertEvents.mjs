// Run this in terminal with: mongosh insertEvents.mjs

const fs = require("fs");

// Connect to your DB
const db = connect("mongodb://localhost:27017/ticketing-system");

// Replace with actual ObjectId of a valid organizer
const organizerId = ObjectId("67fc8f1703887a7a1fc1f460");

// Load JSON data
const raw = fs.readFileSync("events.json");
const events = JSON.parse(raw);

// Helper functions
function parseDate(dateStr) {
  const match = dateStr.match(/([A-Za-z]+ \d{1,2})/);
  if (match) {
    return new Date(`${match[1]}, ${new Date().getFullYear()} 20:00`);
  }
  return new Date();
}

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const match = priceStr.match(/EGP\s*(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// Insert events
events.forEach((e) => {
  const eventDoc = {
    eventID: UUID(),
    title: e["event-name"],
    description: "Placeholder Description",
    date: parseDate(e["event-date"]),
    location: e["event-venue"],
    category: "Placeholder Category",
    image: e.category_img,
    ticketPricing: parsePrice(e["event-price"]),
    totalTickets: 100,
    remainingTickets: 100,
    status: "Approved",
    organizer: organizerId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  db.events.insertOne(eventDoc);
});

print("? Events inserted successfully.");
