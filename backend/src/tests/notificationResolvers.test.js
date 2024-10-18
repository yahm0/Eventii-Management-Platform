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

describe('Notification Resolvers', () => {
    it('should create a new notification', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
          mutation {
            createNotification(notificationInput: { message: "New Notification", recipientId: "someUserId" }) {
              id
              message
            }
          }
        `,
            })
            .expect(200);

        expect(response.body.data.createNotification.message).toBe('New Notification');
    });

    it('should fetch all notifications', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
          query {
            notifications {
              id
              message
            }
          }
        `,
            })
            .expect(200);

        expect(response.body.data.notifications.length).toBeGreaterThan(0);
    });

    // Additional test: Mark a notification as read
    it('should mark a notification as read', async () => {
        const notificationId = 'someNotificationId'; // Replace with a valid notification ID
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
          mutation {
            markNotificationAsRead(id: "${notificationId}") {
              id
              read
            }
          }
        `,
            })
            .expect(200);

        expect(response.body.data.markNotificationAsRead.read).toBe(true);
    });
});
