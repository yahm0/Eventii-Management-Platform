const { gql } = require('apollo-server-express');
const eventSchema = require('./eventSchema');
const userSchema = require('./userSchema');

const baseSchema = gql`
  scalar Date
  type Query
  type Mutation
`;

module.exports = [baseSchema, eventSchema, userSchema];
