const { gql } = require('apollo-server-express'); // Import gql tag from apollo-server-express package

// Define the event schema with Event, EventInput, Query, and Mutation types
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

  type Query {
    events: [Event!]
    event(id: ID!): Event
  }

  type Mutation {
    createEvent(eventInput: EventInput!): Event!
    updateEvent(id: ID!, eventInput: EventInput!): Event!
    deleteEvent(id: ID!): Event!
    registerForEvent(eventId: ID!, token: String!): Event!
  }
`;

module.exports = eventSchema; // Export the event schema
