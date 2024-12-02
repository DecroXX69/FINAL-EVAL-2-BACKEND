const SharedCart = require('../models/SharedCart');

const sharedCartController = {
  createSharedCart: async (req, res) => {
    try {
      const cartData = {
        items: req.body.items,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hour expiry
        total: req.body.total,
        subTotal: req.body.subTotal,
        discount: req.body.discount,
        deliveryFee: req.body.deliveryFee
      };

      const sharedCart = new SharedCart(cartData);
      await sharedCart.save();

      res.status(201).json({ 
        success: true,
        cartId: sharedCart._id 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to create shared cart',
        error: error.message 
      });
    }
  },

  getSharedCart: async (req, res) => {
    try {
      const cart = await SharedCart.findById(req.params.cartId);
      
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Shared cart not found'
        });
      }

      // Check if cart has expired
      if (new Date(cart.expiresAt) < new Date()) {
        await SharedCart.findByIdAndDelete(cart._id);
        return res.status(404).json({
          success: false,
          message: 'Shared cart has expired'
        });
      }

      res.status(200).json({
        success: true,
        cart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching shared cart',
        error: error.message
      });
    }
  },

  // Optional: Cleanup expired carts (can be run as a scheduled task)
  cleanupExpiredCarts: async () => {
    try {
      await SharedCart.deleteMany({ expiresAt: { $lt: new Date() } });
    } catch (error) {
      console.error('Failed to cleanup expired carts:', error);
    }
  }
};

module.exports = sharedCartController;