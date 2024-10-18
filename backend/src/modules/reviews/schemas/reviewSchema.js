const { gql } = require('apollo-server-express');

const reviewTypeDefs = gql`
  type Review {
    id: ID!
    rating: Int!
    comment: String
    author: User!
    event: Event!
    createdAt: String!
  }

  input ReviewInput {
    rating: Int!
    comment: String
    eventId: ID!
  }

  type Query {
    reviews: [Review]
    review(id: ID!): Review
  }

  type Mutation {
    createReview(reviewInput: ReviewInput!): Review
    updateReview(id: ID!, rating: Int, comment: String): Review
    deleteReview(id: ID!): Boolean
    # Add additional review-related mutations here
  }
`;

module.exports = reviewTypeDefs;
