// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userImage: { type: String, required: true },
  userName: { type: String, required: true },
  userLocation: { type: String, required: true },
  date: { type: Date, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;