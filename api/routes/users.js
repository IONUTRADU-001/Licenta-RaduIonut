const express = require('express');
const router = express.Router();

const { register, login, logout, profile } = require('../controllers/userController');

// router.get('/test', (req, res) => {
//     res.json('test ok');
// });

// REGISTER
router.post('/register', register);

// LOGIN
router.post('/login', login);

// PROFILE
router.get('/profile', profile);

// LOGOUT
router.post('/logout', logout);

module.exports = router;