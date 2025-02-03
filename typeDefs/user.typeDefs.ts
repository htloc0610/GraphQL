import { gql } from "apollo-server-express";

export const typeDefsUser = gql`
  type User {
    id: ID
    fullName: String
    email: String
    token: String
  }

  input LoginUserInput {
    email: String
    password: String
  }

  input RegisterUserInput {
    fullName: String
    email: String
    password: String
  }

  type Query {
    getUser: User
  }

  type Mutation {
    registerUser(user: RegisterUserInput): User
    loginUser(user: LoginUserInput): User
  }
`;
