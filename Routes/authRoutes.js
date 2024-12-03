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


router.post('/register', registerUser);
router.post('/login', loginUser);


router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);


router.get('/:userId/addresses', protect, getUserAddresses);       
router.post('/:userId/addresses', protect, addUserAddress);         
router.put('/:userId/addresses/:addressId', protect, updateUserAddress); 
router.delete('/:userId/addresses/:addressId', protect, deleteUserAddress); 

module.exports = router;