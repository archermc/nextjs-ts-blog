import { gql } from "graphql-request";

export const CreateBlogUserByEmail = gql`
  mutation CreateBlogUserByEmail($email: String!, $password: String!) {
    newUser: createBlogUser(data: { email: $email, password: $password }) {
      id
    }
  }
`;

export const PublishBlogUser = gql`
  mutation PublishBlogUser($email: String!) {
    publishedUser: publishBlogUser(where: { email: $email}, to: PUBLISHED) {
      id
    }
  }
`;