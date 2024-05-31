const { gql } = require('apollo-server-express'); // Import gql tag from apollo-server-express package

// Define the user schema with User, UserInput, and AuthPayload types
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

  type Query {
    users: [User!]
    user(id: ID!): User
  }

  type Mutation {
    signup(userInput: UserInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

module.exports = userSchema; // Export the user schema