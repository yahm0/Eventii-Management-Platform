import { gql } from '@apollo/client'; // Import the gql tag from Apollo Client

// Define the SIGNUP_USER mutation
export const SIGNUP_USER = gql`
  mutation SignupUser($userInput: UserInput!) {
    signup(userInput: $userInput) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

// Define the LOGIN_USER mutation
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

// Define the CREATE_EVENT mutation
export const CREATE_EVENT = gql`
  mutation CreateEvent($eventInput: EventInput!) {
    createEvent(eventInput: $eventInput) {
      id
      title
      description
      date
      location
      fee
      organizer {
        name
      }
    }
  }
`;

// Define the REGISTER_FOR_EVENT mutation
export const REGISTER_FOR_EVENT = gql`
  mutation RegisterForEvent($eventId: ID!, $token: String!) {
    registerForEvent(eventId: $eventId, token: $token) {
      id
      title
      description
      date
      location
      fee
    }
  }
`;
