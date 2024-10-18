const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    eventsCreated: [Event]
    eventsAttended: [Event]
    notifications: [Notification]
    reviews: [Review]
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
  }

  type Mutation {
    signup(userInput: UserInput!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    # Add additional user-related mutations here
  }
`;

module.exports = userTypeDefs;
