const { request } = require('express');
const Event = require('../models/Event');

// Controller to get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error while retrieving events' });
  }
};

module.exports = { getAllEvents };

const getOneEvent = async (req, res) => {
    const {title} = request.params;

    try {
        const event = await Event.findOne({title})   
   
        res.status(200).json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ message: 'Server error while retrieving event' });
    }
  };
  
  module.exports = { getOneEvent };