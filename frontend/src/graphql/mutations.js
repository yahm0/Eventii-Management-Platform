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

export const UPDATE_USER_INTERESTED_CATEGORIES = gql`
  mutation UpdateUserInterestedCategories($userId: ID!, $categories: [String!]!) {
    updateUserInterestedCategories(userId: $userId, categories: $categories) {
      id
      interestedCategories
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: ID!, $eventInput: EventInput!) {
    updateEvent(id: $id, eventInput: $eventInput) {
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
