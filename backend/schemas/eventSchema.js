const { gql } = require('apollo-server-express');

const eventSchema = gql`
  type Event {
    id: ID!
    title: String!
    description: String!
    date: String!
    location: String!
    organizer: User!
    attendees: [User!]
    fee: Float
  }

  input EventInput {
    title: String!
    description: String!
    date: String!
    location: String!
    fee: Float
  }

  extend type Query {
    events: [Event!]
    event(id: ID!): Event
  }

  extend type Mutation {
    createEvent(eventInput: EventInput!): Event!
    updateEvent(id: ID!, eventInput: EventInput!): Event!
    deleteEvent(id: ID!): Event!
    registerForEvent(eventId: ID!, token: String!): Event!
  }
`;

module.exports = eventSchema;
