const express = require('express'); // Import express package
const { ApolloServer } = require('apollo-server-express'); // Import ApolloServer class from apollo
const connectDB = require('./config/db'); // Import connectDB function from db.js
const typeDefs = require('./schemas'); // Import typeDefs from schemas/index.js
const resolvers = require('./resolvers'); // Import resolvers from resolvers/index.js
const authMiddleware = require('./utils/auth'); // Import authMiddleware from utils/auth.js

require('dotenv').config(); // Import and configure dotenv package

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

server.applyMiddleware({ app }); // Connect ApolloServer to Express

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);