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

describe('User Resolvers', () => {
    it('should signup a new user', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
          mutation {
            signup(userInput: { name: "Test User", email: "test@example.com", password: "password123" }) {
              token
              user {
                id
                name
                email
              }
            }
          }
        `,
            })
            .expect(200);

        expect(response.body.data.signup.user.email).toBe('test@example.com');
        expect(response.body.data.signup.token).toBeDefined();
    });

    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
          mutation {
            login(email: "test@example.com", password: "password123") {
              token
              user {
                id
                name
                email
              }
            }
          }
        `,
            })
            .expect(200);

        expect(response.body.data.login.user.email).toBe('test@example.com');
        expect(response.body.data.login.token).toBeDefined();
    });

    // Additional test: Attempt to login with incorrect credentials
    it('should return an error for incorrect login credentials', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
          mutation {
            login(email: "wrong@example.com", password: "wrongpassword") {
              token
              user {
                id
                name
                email
              }
            }
          }
        `,
            })
            .expect(401);

        expect(response.body.errors[0].message).toBe('Invalid credentials');
    });

    // Additional test: Fetch user profile
    it('should fetch user profile', async () => {
        const userId = 'someUserId'; // Replace with a valid user ID
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
          query {
            user(id: "${userId}") {
              id
              name
              email
            }
          }
        `,
            })
            .expect(200);

        expect(response.body.data.user.id).toBe(userId);
    });

    it('should fetch all users', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
          query {
            users {
              id
              name
              email
            }
          }
        `,
            })
            .expect(200);

        expect(response.body.data.users.length).toBeGreaterThan(0);
    });

    // Add more tests for other user-related queries and mutations
});
