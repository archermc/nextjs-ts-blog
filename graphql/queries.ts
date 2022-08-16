import { gql } from "graphql-request";

export const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: blogUser(where: { email: $email }) {
      id
      password
    }
  }
`;