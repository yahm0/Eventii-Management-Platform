import { gql } from '@apollo/client';

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


export const CREATE_EVENT = gql`
  mutation CreateEvent($eventInput: EventInput!) {
    createEvent(eventInput: $eventInput) {
      id
      title
      description
      date
      location
      fee
    }
  }
`;

import { gql } from '@apollo/client';

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
