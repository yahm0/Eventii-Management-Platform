const { gql } = require('apollo-server-express');

const eventTypeDefs = gql`
  type Event {
    id: ID!
    title: String!
    description: String!
    date: String!
    location: String!
    fee: Float!
    organizer: User!
    attendees: [User]
    reviews: [Review]
  }

  input EventInput {
    title: String!
    description: String!
    date: String!
    location: String!
    fee: Float!
  }

  type Query {
    events: [Event]
    event(id: ID!): Event
  }

  type Mutation {
    createEvent(eventInput: EventInput!): Event
    updateEvent(id: ID!, eventInput: EventInput!): Event
    deleteEvent(id: ID!): Boolean
    registerForEvent(eventId: ID!): Event
    # Add additional event-related mutations here
  }
`;

module.exports = eventTypeDefs;
