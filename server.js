const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const reviewRoutes = require('./Routes/reviewRoutes');
const foodItemRoutes = require('./Routes/foodItemRoutes');
const authRoutes = require('./Routes/authRoutes');
const seedFoodItems = require('./scripts/seedFoodItems');
const seedReviews = require('./scripts/seedReviews');
const sharedCartRoutes = require('./Routes/sharedCartRoutes');
const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://final-eval-2-frontend.vercel.app', // Replace with your frontend's URL
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // If your frontend sends cookies or authentication headers
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://final-eval-2-frontend.vercel.app/');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB Connected Successfully');
    try {
      await seedFoodItems();
      console.log('Food items seeding completed');
      await seedReviews();
      console.log('Reviews seeding completed');
    } catch (seedError) {
      console.error('Error during seeding:', seedError);
    }
  })
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/users', authRoutes);
app.use('/api', foodItemRoutes);
app.use('/api', reviewRoutes);
app.use('/api', sharedCartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
