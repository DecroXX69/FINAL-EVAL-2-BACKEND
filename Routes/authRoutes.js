const express = require('express');
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile 
} = require('../controllers/authController');
const { 
  getUserAddresses, 
  addUserAddress, 
  updateUserAddress, 
  deleteUserAddress 
} = require('../controllers/userController');
const { protect } = require('../middleware/AuthMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Address routes
router.get('/:userId/addresses', protect, getUserAddresses);        // Fetch all addresses for a user
router.post('/:userId/addresses', protect, addUserAddress);         // Add a new address for a user
router.put('/:userId/addresses/:addressId', protect, updateUserAddress); // Update a specific address for a user
router.delete('/:userId/addresses/:addressId', protect, deleteUserAddress); // Delete a specific address for a user

module.exports = router;