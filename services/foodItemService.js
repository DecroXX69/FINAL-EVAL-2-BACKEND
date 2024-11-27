const FoodItem = require('../Models/FoodItem');

class FoodItemService {
  async getAllFoodItems() {
    return await FoodItem.find();
  }

  async createFoodItem(foodItemData) {
    const foodItem = new FoodItem(foodItemData);
    return await foodItem.save();
  }

  // Add more CRUD methods as needed
}

module.exports = new FoodItemService();