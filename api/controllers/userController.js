const User = require('../models/User');
const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

// REGISTER
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }

};

// LOGIN
const login = async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                // res.cookie('token', token).json(userDoc);
                res.json({ token: token, user: userDoc });
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
}

// LOGOUT
const logout = async (req, res) => {
    res.cookie('token', '').json(true);
}

// PROFILE
const profile = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
};

module.exports = {
    register,
    login,
    logout,
    profile
}