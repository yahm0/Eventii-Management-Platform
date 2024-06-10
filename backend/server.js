const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors'); // Import cors package
const connectDB = require('./config/db');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

require('dotenv').config();

const app = express();
connectDB();

// Use CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
}));

// Parse JSON bodies (as sent by API clients)
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

// Function to start the server and apply middleware
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Handle root URL
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
  
}


// Start the server
startServer();
