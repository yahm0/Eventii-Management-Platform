const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors'); // Import cors package
const mongoose = require('mongoose'); // Import mongoose
const db = require('./config/db');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const { authMiddleware, verifyToken } = require('./utils/auth'); // Import both authMiddleware and verifyToken

require('dotenv').config();
const PORT = process.env.PORT || 3001;

const app = express();

// Use CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001', // Replace with your frontend URL
  credentials: true,
}));

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Create a new ApolloServer instance with the schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    if (token) {
      try {
        const user = verifyToken(token);
        return { user };
      } catch (err) {
        console.error('Token verification failed:', err.message);
      }
    }
    return {};
  },
});

// Start the server and apply middleware
const startApolloServer = async () => {
  await server.start();

  app.use('/graphql', server.getMiddleware({
    path: '/graphql',
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// MongoDB connection string
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://lanbeard105:qMMz33VViTciEU81@eventii.wepmskm.mongodb.net/?retryWrites=true&w=majority&appName=Eventii';

// Connect to MongoDB with updated options
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: 'majority',
    wtimeout: 1000,
    j: true
  }
}).then(() => {
  console.log('Connected to MongoDB');
  startApolloServer();
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
