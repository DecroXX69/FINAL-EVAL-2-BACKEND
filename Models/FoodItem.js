
const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // This will store the Cloudinary URL
  category: { type: String, required: true, enum: ['Burgers', 'Fries', 'Cold Drinks'] }
});

module.exports = mongoose.model('FoodItem', foodItemSchema);