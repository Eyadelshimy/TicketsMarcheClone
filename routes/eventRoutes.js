const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById } = require('../controllers/eventsController');
const { getOneEvent } = require('../eventController');
<<<<<<< Updated upstream
=======
const {roleProtect} = require('../middleware/roleProtect');
>>>>>>> Stashed changes

// List all events
router.get('/', getAllEvents);

// Get one event by title
router.get('/:title', getOneEvent);

<<<<<<< Updated upstream
=======
//get details of a single user
router.get('/', getUserDetails);

// Only admin can access
router.get('/', roleProtect(['admin']), getAllEventsWithUserDetails); 

>>>>>>> Stashed changes
module.exports = router;
