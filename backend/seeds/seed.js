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
  },
  {
    name: 'Porky Pig',
    email: 'p@gmail.com',
    password: 'PorkyPig123',
  },
  {
    name: 'Elmer Fudd',
    email: 'e@gmail.com',
    password: 'ElmerFudd123',
  },
  {
    name: 'Sylvester Cat',
    email: 's@gmail.com',
    password: 'SylvesterCat123',
  },
  {
    name: 'Tweety Bird',
    email: 't@gmail.com',
    password: 'TweetyBird123',
  },
  {
    name: 'Yosemite Sam',
    email: 'y@gmail.com',
    password: 'YosemiteSam123',
  },
  {
    name: 'Foghorn Leghorn',
    email: 'foghorn@gmail.com',
    password: 'Foghorn123',
  },
  {
    name: 'Marvin the Martian',
    email: 'marvin@gmail.com',
    password: 'Martian123',
  },
  {
    name: 'Tasmanian Devil',
    email: 'taz@gmail.com',
    password: 'Taz123',
  },
  {
    name: 'Pepe Le Pew',
    email: 'pepe@gmail.com',
    password: 'PepeLePew123',
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
        title: 'Carrot Crunching Contest',
        date: new Date(),
        description: 'A contest to see who can crunch the most carrots, hosted by Bugs Bunny.',
        fee: 15.0,
        organizer: createdUsers[0]._id,
        location: 'Bunny Borough'
      },
      {
        title: 'Duck Season Shooting Range',
        date: new Date(),
        description: 'A fun shooting range event during duck season, organized by Daffy Duck.',
        fee: 20.0,
        organizer: createdUsers[1]._id,
        location: 'Duck Pond'
      },
      {
        title: 'Porky Pig’s Picnic Party',
        date: new Date(),
        description: 'Join Porky Pig for a fun-filled picnic party with games and food.',
        fee: 10.0,
        organizer: createdUsers[2]._id,
        location: 'Porky’s Pasture'
      },
      {
        title: 'Elmer Fudd’s Hunting Expedition',
        date: new Date(),
        description: 'Join Elmer Fudd on a hunting expedition, but watch out for Bugs Bunny!',
        fee: 25.0,
        organizer: createdUsers[3]._id,
        location: 'Fudd’s Forest'
      },
      {
        title: 'Sylvester’s Sneaky Stalk',
        date: new Date(),
        description: 'A fun event where participants sneak around and try to catch Tweety Bird.',
        fee: 12.0,
        organizer: createdUsers[4]._id,
        location: 'Sylvester’s Alley'
      },
      {
        title: 'Tweety’s Twittering Talent Show',
        date: new Date(),
        description: 'Show off your talent in Tweety Bird’s talent show.',
        fee: 8.0,
        organizer: createdUsers[5]._id,
        location: 'Tweety’s Nest'
      },
      {
        title: 'Yosemite Sam’s Rodeo Roundup',
        date: new Date(),
        description: 'Join Yosemite Sam for a wild rodeo roundup.',
        fee: 18.0,
        organizer: createdUsers[6]._id,
        location: 'Sam’s Saloon'
      },
      {
        title: 'Foghorn Leghorn’s Barnyard Bash',
        date: new Date(),
        description: 'A barnyard bash with music and dancing, hosted by Foghorn Leghorn.',
        fee: 15.0,
        organizer: createdUsers[7]._id,
        location: 'Leghorn’s Barn'
      },
      {
        title: 'Marvin the Martian’s Space Race',
        date: new Date(),
        description: 'A thrilling space race event hosted by Marvin the Martian.',
        fee: 20.0,
        organizer: createdUsers[8]._id,
        location: 'Martian’s Meteor'
      },
      {
        title: 'Taz’s Tornado Twister',
        date: new Date(),
        description: 'A wild and fun event where participants try to out-twist Taz.',
        fee: 12.0,
        organizer: createdUsers[9]._id,
        location: 'Taz’s Tornado Park'
      },
      {
        title: 'Pepe Le Pew’s Romantic Rendezvous',
        date: new Date(),
        description: 'A romantic evening event hosted by Pepe Le Pew.',
        fee: 25.0,
        organizer: createdUsers[10]._id,
        location: 'Le Pew’s Love Lane'
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
