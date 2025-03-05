const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    numberOfTickets:{
        type: Number,
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'confirmed', 'canceled'],
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);