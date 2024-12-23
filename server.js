// server.js
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


app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

mongoose.connect(process.env.MONGODB_URI)
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


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
// Routes

app.use('/api/users', authRoutes);
app.use('/api', foodItemRoutes);
app.use('/api', reviewRoutes); 
app.use('/api', sharedCartRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});