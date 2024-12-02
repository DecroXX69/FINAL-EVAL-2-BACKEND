const mongoose = require('mongoose');

const sharedCartSchema = new mongoose.Schema({
  items: [{
    _id: String,
    name: String,
    price: Number,
    quantity: Number,
    description: String,
    image: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  },
  total: Number,
  subTotal: Number,
  discount: Number,
  deliveryFee: Number
});

module.exports = mongoose.model('SharedCart', sharedCartSchema);