const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById } = require('../controllers/eventsController');
const { getOneEvent } = require('../eventController');

// List all events
router.get('/', getAllEvents);

// Get one event by title
router.get('/:title', getOneEvent);

module.exports = router;
