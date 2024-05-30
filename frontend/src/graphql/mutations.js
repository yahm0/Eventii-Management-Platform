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
