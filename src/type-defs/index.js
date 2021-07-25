const { gql } = require('apollo-server-express');

module.exports = gql`
  type Tag {
    _id: ID!
    title: String!
  }

  type Query {
    tags: [Tag]
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  type User {
    username: String!
    email: String!
    bio: String
    image: String
    token: String
  }

  type UserPayload {
    user: User
  }

  type Mutation {
    login(user: LoginInput): UserPayload
    createUser(user: CreateUserInput): UserPayload
  }
`;
