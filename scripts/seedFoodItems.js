// seedFoodItems.js
const mongoose = require('mongoose');
const FoodItem = require('../Models/FoodItem');
const FoodItem = require('../Models/FoodItem');

mongoose.connect('mongodb://localhost:27017/user_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const foodItems = [
  // Burgers
  {
    name: 'Royal Cheese Burger with extra fries',
    description: 'Big Mac™, 2 beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun',
    price: 120.0,
    image: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732670798/assets/wz8wa8jzhfmzibdk6fvp.png',
    category: 'Burgers'
  },
  {
    name: 'The classics for 3',
    description: '3 x Royal Cheeseburger, 3 x medium fries, 3 x medium drinks',
    price: 120.0,
    image: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732670797/assets/ytoqcccwobur0hskinh3.png',
    category: 'Burgers'
  },
  {
    name: 'The classics for 3',
    description: '3 x Royal Cheeseburger, 3 x medium fries, 3 x medium drinks',
    price: 120.0,
    image: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732670797/assets/zyd73fx4iuhe4sj132sh.png',
    category: 'Burgers'
  },
  {
    name: 'The classics for 3',
    description: '3 x Royal Cheeseburger, 3 x medium fries, 3 x medium drinks',
    price: 120.0,
    image: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732670798/assets/ilf3dbyaeln8enfkuyxv.png',
    category: 'Burgers'
  },

  // Fries
  {
    name: 'Royal Cheese Burger with extra Fries',
    description: 'Big Mac™, 2 beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun',
    price: 70.0,
    image: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732670797/assets/leqk30eidxuobu1m3svc.png',
    category: 'Fries'
  },
  {
    name: 'The classics for 3',
    description: '3 x Royal Cheeseburger, 3 x medium fries, 3 x medium drinks',
    price: 70.0,
    image: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732670797/assets/n7okb1xewwbgrs06c8wx.png',
    category: 'Fries'
  },
  {
    name: 'The classics for 3',
    description: '3 x Royal Cheeseburger, 3 x medium fries, 3 x medium drinks',
    price: 70.0,
    image: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732670797/assets/pxqhub1zf64qr0cvmmmu.png',
    category: 'Fries'
  },

  {
    name: 'The classics for 3',
    description: '3 x Royal Cheeseburger, 3 x medium fries, 3 x medium drinks',
    price: 70.0,
    image: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732670797/assets/v2kbpydywgsoy8g4pshe.png',
    category: 'Fries'
  },

  // Cold Drinks
  {
    name: 'Royal Cheese Burger with extra Fries',
    description: 'Big Mac™, 2 beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun',
    price: 40.0,
    image: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732670797/assets/ermg0aughb3bdwbnrgew.png',
    category: 'Cold Drinks'
  },
  {
    name: 'The classics for 3',
    description: '3 x Royal Cheeseburger, 3 x medium fries, 3 x medium drinks',
    price: 40.0,
    image: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732670796/assets/im0gkmkhvjza5korx6xr.png',
    category: 'Cold Drinks'
  },
  {
    name: 'The classics for 3',
    description: '3 x Royal Cheeseburger, 3 x medium fries, 3 x medium drinks',
    price: 40.0,
    image: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732670798/assets/aqlzzr5idkslj7zabhfv.png',
    category: 'Cold Drinks'
  },
  {
    name: 'The classics for 3',
    description: '3 x Royal Cheeseburger, 3 x medium fries, 3 x medium drinks',
    price: 40.0,
    image: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732670798/assets/wng3kjhb6jczbd8nracs.png',
    category: 'Cold Drinks'
  }
];

const seedFoodItems = async () => {
  try {
    // Check if items already exist to prevent duplicate seeding
    const existingItems = await FoodItem.countDocuments();
    if (existingItems > 0) {
      console.log('Food items already seeded. Skipping...');
      return;
    }

    await FoodItem.deleteMany({});
    await FoodItem.insertMany(foodItems);
    console.log('Food items seeded successfully!');
  } catch (error) {
    console.error('Error seeding food items:', error);
    throw error; // Re-throw to be caught in server.js
  }
};

module.exports = seedFoodItems;
