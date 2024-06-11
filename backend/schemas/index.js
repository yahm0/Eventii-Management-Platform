const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Event {
    id: ID!
    title: String!
    description: String!
    date: String!
    location: String!
    fee: Float
  }

  type Query {
    users: [User]
    events: [Event]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): User
    addEvent(title: String!, description: String!, date: String!, location: String!, fee: Float): Event
  }
`;

module.exports = typeDefs;
