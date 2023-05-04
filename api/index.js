const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

require('dotenv').config();
const app = express();

const userRoutes = require('./routes/users.js');
const placesRoutes = require('./routes/places.js');
const bookingRoutes = require('./routes/bookings.js');
const uploadRoutes = require('./routes/upload.js');

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

app.use(userRoutes);
app.use(placesRoutes);
app.use(bookingRoutes);
app.use(uploadRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(4000);
  console.log('Connected to DB and listening on port 4000');
}).catch(err => { console.log(err) });
