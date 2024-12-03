
const mongoose = require('mongoose');
const Review = require('../Models/Review');



const reviews = [
  {
    userImage: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732847284/assets/sarf6ktfzofhqokqbwfe.png',
    userName: 'St Gix',
    userLocation: 'South London',
    date: new Date('2023-09-24'),
    review: 'The neutral aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald\'s standard - hot and satisfying.',
    rating: 5
  },
  {
    userImage: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732847284/assets/sarf6ktfzofhqokqbwfe.png',
    userName: 'St Tix',
    userLocation: 'South London',
    date: new Date('2023-09-24'),
    review: 'The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald\'s standard - hot and satisfying.',
    rating: 5
  },
  {
    userImage: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732847284/assets/sarf6ktfzofhqokqbwfe.png',
    userName: 'St Wix',
    userLocation: 'West London',
    date: new Date('2023-09-24'),
    review: 'The negative aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald\'s standard - hot and satisfying.',
    rating: 5
  },
  {
    userImage: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732847284/assets/sarf6ktfzofhqokqbwfe.png',
    userName: 'St Gix',
    userLocation: 'East London',
    date: new Date('2023-09-24'),
    review: 'The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald\'s standard - hot and satisfying.',
    rating: 5
  },
  {
    userImage: 'https://res.cloudinary.com/drfwyf8av/image/upload/v1732847284/assets/sarf6ktfzofhqokqbwfe.png',
    userName: 'St Fix',
    userLocation: 'North London',
    date: new Date('2023-09-24'),
    review: 'The negative aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald\'s standard - hot and satisfying.',
    rating: 5
  }
];

const seedReviews = async () => {
    try {
      
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
      throw error; 
    }
  };

module.exports = seedReviews;