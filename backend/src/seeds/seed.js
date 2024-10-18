const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../src/modules/users/models/User');
const Event = require('../modules/events/models/Event');
const Notification = require('../src/modules/notifications/models/Notification');
const Review = require('../src/modules/reviews/models/Review');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Event.deleteMany({});
        await Notification.deleteMany({});
        await Review.deleteMany({});

        // Create users
        const user1 = new User({ name: 'Alice', email: 'alice@example.com', password: 'password123' });
        const user2 = new User({ name: 'Bob', email: 'bob@example.com', password: 'password123' });
        await user1.save();
        await user2.save();

        // Create events
        const event1 = new Event({
            title: 'GraphQL Workshop',
            description: 'Learn GraphQL basics.',
            date: '2023-11-01',
            location: 'Online',
            fee: 0,
            organizer: user1.id,
        });
        const event2 = new Event({
            title: 'Node.js Meetup',
            description: 'Discuss Node.js best practices.',
            date: '2023-12-15',
            location: 'New York',
            fee: 50,
            organizer: user2.id,
        });
        await event1.save();
        await event2.save();

        // Create reviews
        const review1 = new Review({
            rating: 5,
            comment: 'Great workshop!',
            author: user2.id,
            event: event1.id,
        });
        await review1.save();

        // Create notifications
        const notification1 = new Notification({
            message: 'Welcome to the platform!',
            recipient: user1.id,
        });
        await notification1.save();

        console.log('Data seeded');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB().then(seedData);
