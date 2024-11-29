// controllers/reviewController.js
const Review = require('../Models/Review');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: 'drfwyf8av',
  api_key: '126298433753394',
  api_secret: '_2mCS8BBDDESXnjcQRCLl5fetoM'
});

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});

    // Fetch the user profile images from Cloudinary
    const reviewsWithImages = await Promise.all(
      reviews.map(async (review) => {
        const imageUrl = await cloudinary.url(review.userImage, {
          width: 48,
          height: 48,
          crop: 'fill',
          radius: 'max'
        });
        return { ...review.toObject(), userImage: imageUrl };
      })
    );

    res.json(reviewsWithImages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};