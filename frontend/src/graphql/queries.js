import { gql } from '@apollo/client'; // Import the gql tag from Apollo Client

// Define the GET_EVENTS query
export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      description
      date
      location
      organizer {
        name
      }
    }
  }
`;

// Define the GET_USER query
export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      events {
        id
        title
      }
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      title
      description
      date
      location
      organizer {
        name
      }
    }
  }
`;
