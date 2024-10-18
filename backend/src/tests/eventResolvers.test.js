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

describe('Event Resolvers', () => {
    it('should create a new event', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
          mutation {
            createEvent(eventInput: { title: "New Event", description: "Event Description", date: "2023-12-01", location: "Online", fee: 0 }) {
              id
              title
              description
            }
          }
        `,
            })
            .expect(200);

        expect(response.body.data.createEvent.title).toBe('New Event');
    });

    it('should fetch all events', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
          query {
            events {
              id
              title
              description
            }
          }
        `,
            })
            .expect(200);

        expect(response.body.data.events.length).toBeGreaterThan(0);
    });

    // Additional test: Attempt to create an event with missing fields
    it('should return an error when creating an event with missing fields', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
          mutation {
            createEvent(eventInput: { title: "", description: "", date: "", location: "", fee: 0 }) {
              id
              title
              description
            }
          }
        `,
            })
            .expect(400);

        expect(response.body.errors[0].message).toContain('Field validation error');
    });

    // Additional test: Fetch a single event by ID
    it('should fetch a single event by ID', async () => {
        const eventId = 'someEventId'; // Replace with a valid event ID
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
          query {
            event(id: "${eventId}") {
              id
              title
              description
            }
          }
        `,
            })
            .expect(200);

        expect(response.body.data.event.id).toBe(eventId);
    });
});
