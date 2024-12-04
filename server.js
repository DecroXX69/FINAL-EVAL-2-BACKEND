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
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://final-eval-2-frontend.vercel.app/"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

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
