const Booking = require('../models/Booking.js');
const jwt = require('jsonwebtoken');
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.headers.authorization?.split(' ')[1], jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
}

const getBookingsForUser = async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({ user: userData.id }).populate('place'));
}

const addBooking = async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const {
        place, checkIn, checkOut, numberOfGuests, name, phone, price,
    } = req.body;
    Booking.create({
        place, checkIn, checkOut, numberOfGuests, name, phone, price,
        user: userData.id,
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
}

module.exports = { addBooking, getBookingsForUser };