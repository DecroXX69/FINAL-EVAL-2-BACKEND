// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const reviewRoutes = require('./Routes/reviewRoutes');
const foodItemRoutes = require('./Routes/foodItemRoutes');
const authRoutes = require('./Routes/authRoutes');
const seedFoodItems = require('./scripts/seedFoodItems');
const seedReviews = require('./scripts/seedReviews'); // Add this line
const sharedCartRoutes = require('./Routes/sharedCartRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB Connected Successfully');
  // Seed both food items and reviews after successful connection
  try {
    await seedFoodItems();
    console.log('Food items seeding completed');
    
    await seedReviews(); // Add this line
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