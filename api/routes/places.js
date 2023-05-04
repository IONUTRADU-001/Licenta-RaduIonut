const express = require('express');
const router = express.Router();

const {
    getAllPlaces,
    addPlace,
    getUserPlaces,
    getPlaceById,
    updatePlace
} = require('../controllers/placeController')

// GET ALL PLACES
router.get('/places', getAllPlaces);

// ADD PLACE
router.post('/places', addPlace);

// GET USER PLACES
router.get('/user-places', getUserPlaces);

// GET PLACE BY ID
router.get('/places/:id', getPlaceById);

// UPDATE PLACE
router.put('/places', updatePlace);

module.exports = router;