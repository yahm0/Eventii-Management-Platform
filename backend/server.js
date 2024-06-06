const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const { verifyToken, generateToken, generateRefreshToken } = require('./config/auth'); // Ensure correct import path
const authMiddleware = require('./utils/auth'); // Ensure correct import path

require('dotenv').config();

const app = express();
connectDB();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Define authRoutes in a separate file and import it
const authRoutes = require('./routes/authRoutes'); // Make sure to create this file as mentioned earlier

// Apply middleware only to routes that need it
// app.use(authMiddleware); // Apply this to specific routes if needed

// Create a new ApolloServer instance with the schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    if (token) {
      try {
        const user = verifyToken(token); // Use the correct function
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

  // Use the auth routes
  app.use('/auth', authRoutes);

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

// Start the server
startServer();
