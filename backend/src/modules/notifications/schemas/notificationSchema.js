const { gql } = require('apollo-server-express');

const notificationTypeDefs = gql`
  type Notification {
    id: ID!
    message: String!
    recipient: User!
    read: Boolean!
    createdAt: String!
  }

  input NotificationInput {
    message: String!
    recipientId: ID!
  }

  type Query {
    notifications: [Notification]
    notification(id: ID!): Notification
  }

  type Mutation {
    createNotification(notificationInput: NotificationInput!): Notification
    markNotificationAsRead(id: ID!): Notification
    # Add additional notification-related mutations here
  }
`;

module.exports = notificationTypeDefs;
