const { gql } = require('apollo-server-express');

module.exports = gql`
  directive @auth on FIELD_DEFINITION

  type Tag {
    _id: ID!
    title: String!
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

  input UpdateUserInput {
    username: String
    email: String
    bio: String
    image: String
    password: String
  }

  type User {
    username: String!
    email: String!
    bio: String
    image: String
    token: String
    following: Boolean
  }

  type UserPayload {
    user: User
  }

  input CreateArticleInput {
    title: String!
    description: String!
    body: String!
    tagList: [String!]
    favorited: Boolean
    favoritesCount: Int
  }

  input UpdateArticleInput {
    title: String
    description: String
    body: String
    tagList: [String!]
  }

  type Article {
    _id: String!
    title: String!
    description: String!
    body: String!
    tagList: [String!]
    createdAt: String!
    updatedAt: String!
    author: User
  }

  type CreateArticlePayload {
    article: Article
  }

  type ArticlePayload {
    article: Article
  }

  type ArticlesPayload {
    articles: [Article!]
    articlesCount: Int!
  }

  type DeleteArticlePayload {
    success: Boolean
  }

  type Query {
    tags: [Tag]
    currentUser: User @auth
    articles(offset: Int = 0, limit: Int = 2): ArticlesPayload
    getArticleById(articleId: String): ArticlePayload
  }

  type Mutation {
    # User
    login(user: LoginInput): UserPayload
    createUser(user: CreateUserInput): UserPayload
    updateUser(user: UpdateUserInput): UserPayload @auth

    # Article
    createArticle(article: CreateArticleInput): CreateArticlePayload @auth
    updateArticle(articleId: String, article: UpdateArticleInput): CreateArticlePayload @auth
    deleteArticle(articleId: String): DeleteArticlePayload @auth
  }
`;
