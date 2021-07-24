const { gql } = require('apollo-server-express');

module.exports = gql`
  type Tag {
    _id: ID!
    title: String!
  }

  type Query {
    tags: [Tag]
  }
`;
