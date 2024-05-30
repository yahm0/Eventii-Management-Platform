const { gql } = require('apollo-server-express'); // Import gql tag from apollo-server-express package
const eventSchema = require('./eventSchema'); // Import eventSchema
const userSchema = require('./userSchema'); // Import userSchema

// Define the base schema with Date, Query, and Mutation types
const baseSchema = gql`
  scalar Date
  type Query
  type Mutation
`;

module.exports = [baseSchema, eventSchema, userSchema]; // Export the base schema with eventSchema and userSchema