const { gql } = require('apollo-server-express');

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    events: [Event!]
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  extend type Query {
    users: [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    signup(userInput: UserInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

module.exports = userSchema;
