const SharedCart = require('../models/SharedCart');

const sharedCartController = {
  createSharedCart: async (req, res) => {
    try {
      const cartData = {
        items: req.body.items,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), 
        total: req.body.total,
        subTotal: req.body.subTotal,
        discount: req.body.discount,
        deliveryFee: req.body.deliveryFee
      };

      const sharedCart = new SharedCart(cartData);
      await sharedCart.save();

      res.header('Content-Type', 'application/json');
      res.status(201).json({ 
        success: true,
        cartId: sharedCart._id 
      });
    } catch (error) {
      res.header('Content-Type', 'application/json');
      res.status(500).json({ 
        success: false, 
        message: 'Failed to create shared cart',
        error: error.message 
      });
    }
  },

  getSharedCart: async (req, res) => {
    
    res.set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
  
    try {
      console.log('Fetching cart with ID:', req.params.cartId); 
  
      const cart = await SharedCart.findById(req.params.cartId);
      
      if (!cart) {
        console.log('Cart not found'); 
        return res.status(404).json({
          success: false,
          message: 'Shared cart not found'
        });
      }
  
      
      if (new Date(cart.expiresAt) < new Date()) {
        console.log('Cart expired'); 
        await SharedCart.findByIdAndDelete(cart._id);
        return res.status(404).json({
          success: false,
          message: 'Shared cart has expired'
        });
      }
  
      console.log('Sending cart data:', cart); 
  
      return res.status(200).json({
        success: true,
        cart
      });
    } catch (error) {
      console.error('Server error:', error); 
      
      if (error.name === 'CastError') {
        return res.status(400).json({
          success: false,
          message: 'Invalid cart ID format'
        });
      }
  
      return res.status(500).json({
        success: false,
        message: 'Error fetching shared cart',
        error: error.message
      });
    }
  },

  cleanupExpiredCarts: async () => {
    try {
      await SharedCart.deleteMany({ expiresAt: { $lt: new Date() } });
    } catch (error) {
      console.error('Failed to cleanup expired carts:', error);
    }
  }
};

module.exports = sharedCartController;