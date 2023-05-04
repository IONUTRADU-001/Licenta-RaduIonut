const express = require('express');
const router = express.Router();

const { getBookingsForUser, addBooking } = require('../controllers/bookingController');

// ADD BOOKING
router.post('/bookings', addBooking);

// GET BOOKING FOR USER
router.get('/bookings', getBookingsForUser);

module.exports = router;