const request = require('supertest');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('../schemas');
const resolvers = require('../resolvers');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let server;
let app;

beforeAll(async () => {
    app = express();
    server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ /* mock context if needed */ }),
    });
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    await mongoose.connect(process.env.MONGODB_URI_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await server.stop();
});

describe('Review Resolvers', () => {
    it('should create a new review', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
          mutation {
            createReview(reviewInput: { rating: 5, comment: "Great event!", eventId: "someEventId" }) {
              id
              rating
              comment
            }
          }
        `,
            })
            .expect(200);

        expect(response.body.data.createReview.rating).toBe(5);
    });

    it('should fetch all reviews', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
          query {
            reviews {
              id
              rating
              comment
            }
          }
        `,
            })
            .expect(200);

        expect(response.body.data.reviews.length).toBeGreaterThan(0);
    });

    // Add more tests for other review-related queries and mutations
});
