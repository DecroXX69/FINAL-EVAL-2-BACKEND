// scripts/seedReviews.js
const mongoose = require('mongoose');
const Review = require('../Models/Review');

mongoose.connect('mongodb://localhost:27017/user_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const reviews = [
  {
    userImage: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732847284/assets/sarf6ktfzofhqokqbwfe.png',
    userName: 'St Gix',
    userLocation: 'South London',
    date: new Date('2023-09-24'),
    review: 'The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald\'s standard - hot and satisfying.',
    rating: 5
  },
  {
    userImage: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732847284/assets/sarf6ktfzofhqokqbwfe.png',
    userName: 'St Gix',
    userLocation: 'South London',
    date: new Date('2023-09-24'),
    review: 'The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald\'s standard - hot and satisfying.',
    rating: 5
  },
  {
    userImage: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732847284/assets/sarf6ktfzofhqokqbwfe.png',
    userName: 'St Gix',
    userLocation: 'South London',
    date: new Date('2023-09-24'),
    review: 'The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald\'s standard - hot and satisfying.',
    rating: 5
  },
  {
    userImage: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732847284/assets/sarf6ktfzofhqokqbwfe.png',
    userName: 'St Gix',
    userLocation: 'South London',
    date: new Date('2023-09-24'),
    review: 'The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald\'s standard - hot and satisfying.',
    rating: 5
  }
];

const seedReviews = async () => {
    try {
      // Check if reviews already exist to prevent duplicate seeding
      const existingReviews = await Review.countDocuments();
      if (existingReviews > 0) {
        console.log('Reviews already seeded. Skipping...');
        return;
      }
  
      await Review.deleteMany({});
      await Review.insertMany(reviews);
      console.log('Reviews seeded successfully!');
    } catch (error) {
      console.error('Error seeding reviews:', error);
      throw error; // Re-throw to be caught in server.js
    }
  };

module.exports = seedReviews;