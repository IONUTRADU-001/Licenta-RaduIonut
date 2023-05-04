const express = require('express');
const router = express.Router();
const multer = require('multer');
const photosMiddleware = multer({ dest: '/tmp' });

const { upload, uploadByLink } = require('../controllers/uploadController');

// UPLOAD BY LINK
router.post('/upload-by-link', uploadByLink);

// UPLOAD
router.post('/upload', photosMiddleware.array('photos', 100), upload);

module.exports = router;