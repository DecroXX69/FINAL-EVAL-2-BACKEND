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



// Apply CORS middleware



app.use(express.json());
app.use(
  cors({
    origin: 'https://final-eval-2-frontend.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);


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
