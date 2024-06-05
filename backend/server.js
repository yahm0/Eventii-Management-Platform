require('dotenv').config(); // Import and configure dotenv package
const express = require('express'); // Import express package
const { ApolloServer } = require('apollo-server-express'); // Import ApolloServer class from apollo
const connectDB = require('./config/db'); // Import connectDB function from db.js
const typeDefs = require('./schemas'); // Import typeDefs from schemas/index.js
const resolvers = require('./resolvers'); // Import resolvers from resolvers/index.js
const authMiddleware = require('./utils/auth'); // Import authMiddleware from utils/auth.js

connectDB(); // Connect to the database

// Create an Express server
const app = express();
connectDB();
app.use(authMiddleware);

// Create a new ApolloServer instance with the schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user }),
});

// Function to start the server and apply middleware
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

// Start the server
startServer();
