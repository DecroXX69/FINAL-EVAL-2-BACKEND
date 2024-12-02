const express = require('express');
const router = express.Router();
const sharedCartController = require('../controllers/sharedCartController');

router.post('/shared-carts', sharedCartController.createSharedCart);
router.get('/shared-carts/:cartId', sharedCartController.getSharedCart);

module.exports = router;