// seedFoodItems.js
const mongoose = require('mongoose');
const FoodItem = require('./FoodItem');

mongoose.connect('mongodb://localhost:27017/user_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const foodItems = [
  {
    name: 'Royal Cheese Burger',
    description: 'Big Mac™, 2 beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun',
    price: 7.0,
    image: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732670798/assets/wz8wa8jzhfmzibdk6fvp.png',
    category: 'Burgers'
  },
  {
    name: 'The classics for 3',
    description: '3 x Royal Cheeseburger, 3 x medium fries, 3 x medium drinks',
    price: 12.0,
    image: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732670797/assets/ytoqcccwobur0hskinh3.png',
    category: 'Burgers'
  },
  // Add more food items here
];

const seedFoodItems = async () => {
  try {
    await FoodItem.deleteMany({});
    await FoodItem.insertMany(foodItems);
    console.log('Food items seeded successfully!');
  } catch (error) {
    console.error('Error seeding food items:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedFoodItems();