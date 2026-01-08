import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      id
      email
      fullName
      role
      createdAt
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      email
      fullName
      role
      createdAt
    }
  }
`;

export const UPDATE_USER_BALANCE = gql`
  mutation UpdateUserBalance($userId: ID!, $amount: Float!) {
    updateUserBalance(userId: $userId, amount: $amount) {
      id
      userId
      fiatBalance
      frozenBalance
      currency
    }
  }
`;
