// Routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// GET all reviews
router.get('/reviews', reviewController.getReviews);

module.exports = router;