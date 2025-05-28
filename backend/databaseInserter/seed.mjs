// Run this in terminal with: mongosh insertEvents.mjs

const fs = require("fs");

// Connect to your DB
const db = connect("mongodb://localhost:27017/TicketsMarcheDB");

// Replace with actual ObjectId of a valid organizer
const organizerId = ObjectId("6835a47038b495ca889386e8");

// Load JSON data
const raw = fs.readFileSync("./backend/databaseInserter/events.json");
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

function getRandomMultipleOf50(min = 300, max = 1000) {
  const minMultiplier = Math.ceil(min / 50);
  const maxMultiplier = Math.floor(max / 50);
  const randomMultiplier =
    Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) +
    minMultiplier;
  return randomMultiplier * 50;
}

function randomRemain(max) {
  return Math.floor(Math.random() * max) + 1;
}

// Insert events
events.forEach((e) => {
  const randomNumber = getRandomMultipleOf50();
  const eventDoc = {
    eventID: UUID(),
    title: e["event-name"],
    description: e["event-description"],
    date: parseDate(e["event-date"]),
    location: e["event-venue"],
    category: e["event-category"],
    image: e.category_img,
    ticketPricing: parsePrice(e["event-price"]),
    totalTickets: randomNumber, //random number maben 300=< x < 1000 and must be a multiple of 50
    remainingTickets: randomRemain(randomNumber), // random number maben 1 =< x =< tital tickets
    status: "Approved",
    organizer: organizerId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  db.events.insertOne(eventDoc);
});

print("? Events inserted successfully.");

