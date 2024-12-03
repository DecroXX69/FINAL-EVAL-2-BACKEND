
const cloudinary = require('cloudinary').v2;
const FoodItem = require('../Models/FoodItem');

cloudinary.config({
  cloud_name: 'drfwyf8av',
  api_key: '126298433753394',
  api_secret: '_2mCS8BBDDESXnjcQRCLl5fetoM'
});

exports.getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFoodItem = async (req, res) => {
  const { name, description, price, category } = req.body;
  let image;

  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.secure_url;
    }

    const foodItem = new FoodItem({ name, description, price, image, category });
    await foodItem.save();
    res.status(201).json(foodItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add more CRUD operations as needed