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