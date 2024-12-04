const express = require('express');
const router = express.Router();
const foodItemController = require('../controllers/foodItemController');
const { protect } = require('../middleware/AuthMiddleware');

router.get('/food-items', protect, foodItemController.getAllFoodItems);
router.post('/food-items', protect, foodItemController.createFoodItem);


module.exports = router;