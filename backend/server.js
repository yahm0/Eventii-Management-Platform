const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./src/config/db');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const { verifyToken } = require('./src/utils/auth');
const createLoaders = require('./src/utils/DataLoader');
const helmet = require('helmet');
const { RateLimiterMemory } = require('rate-limiter-flexible');

require('dotenv').config();
// Now you can access environment variables using process.env.VARIABLE_NAME
const PORT = process.env.PORT || 3001;

const app = express();

// Use CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Connect to MongoDB
connectDB();

// Use Helmet to secure HTTP headers
app.use(helmet());

const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 1, // per second
});

app.use((req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests');
    });
});

// Create a new ApolloServer instance with the schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    let user = null;
    if (token) {
      try {
        user = verifyToken(token);
      } catch (err) {
        console.error('Token verification failed:', err.message);
      }
    }
    return { user, loaders: createLoaders() };
  },
  playground: process.env.NODE_ENV !== 'production',
});

// Start the server and apply middleware
const startApolloServer = async () => {
  await server.start();

  // Apply the GraphQL middleware
  server.applyMiddleware({ app, path: '/graphql' });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
  }

  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
