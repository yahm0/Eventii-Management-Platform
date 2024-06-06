require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Event = require('../models/Event');

const users = [
  {
    name: 'Bugs Bunny',
    email: 'b@gmail.com',
    password: 'BigBugs123',
  },
  {
    name: 'Daffy Duck',
    email: 'd@gmail.com',
    password: 'DaffyDuck123',
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.deleteMany({});
    await Event.deleteMany({});

    const createdUsers = await User.insertMany(users);

    const events = [
      {
        title: 'Event 1',
        date: new Date(),
        description: 'Description for event 1',
        fee: 10.0,
        organizer: createdUsers[0]._id,
        location: 'Location 1'
      },
      {
        title: 'Event 2',
        date: new Date(),
        description: 'Description for event 2',
        fee: 20.0,
        organizer: createdUsers[1]._id,
        location: 'Location 2'
      }
    ];

    await Event.insertMany(events);

    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seedDB();
