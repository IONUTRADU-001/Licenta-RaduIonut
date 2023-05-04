const Place = require('../models/Place.js');
const jwt = require('jsonwebtoken');
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

// GET ALL PLACES
const getAllPlaces = async (req, res) => {
    res.json(await Place.find());
};

// ADD PLACE
const addPlace = async (req, res) => {
    const token = req.body.token;
    const {
        title, address, addedPhotos, description, price,
        perks, extraInfo, checkIn, checkOut, maxGuests,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id, price,
            title, address, photos: addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests,
        });
        res.json(placeDoc);
    });
};

// GET USER PLACES
const getUserPlaces = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const id = req.headers.authorization?.split(' ')[2];
    
    jwt.verify(token, jwtSecret, {}, async () => {
        res.json(await Place.find({ owner: id }));
    });
};

// GET PLACE BY ID
const getPlaceById = async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
};

// UPDATE PLACE
const updatePlace = async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests, price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkIn, checkOut, maxGuests, price,
            });
            await placeDoc.save();
            res.json('ok');
        }
    });
};

module.exports = {
    getAllPlaces,
    addPlace,
    getUserPlaces,
    getPlaceById,
    updatePlace
}