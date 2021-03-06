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

  input CreateCommentInput {
    articleId: String!
    body: String!
  }

  type CreateCommentPayload {
    comment: Comment
  }

  type Comment {
    _id: String!
    author: String!
    articleId: String!
    body: String!
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
    favoritesCount: Int!
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

  type CommentsPayload {
    comments: [Comment]
  }

  type FeedPayload {
    articles: [Article!]
    articlesCount: Int!
  }

  type DeleteArticlePayload {
    success: Boolean
  }

  type Profile {
    username: String!
    bio: String
    image: String
    following: Boolean
  }

  type ProfilePayload {
    profile: Profile
  }

  type FollowPayload {
    success: Boolean
  }

  type SimplePayload {
    success: Boolean
  }

  type DeleteCommentPayload {
    success: Boolean
    comment: Comment
  }

  type Query {
    # User
    currentUser: User @auth
    getProfile(userId: String): ProfilePayload @auth

    # Article
    articles(offset: Int = 0, limit: Int = 10): ArticlesPayload
    feed(offset: Int = 0, limit: Int = 10): FeedPayload @auth
    getArticleById(articleId: String): ArticlePayload
    tags: [Tag]

    # Comment
    getComments(articleId: String, offset: Int = 0, limit: Int = 20): CommentsPayload
  }

  type Mutation {
    # User
    login(user: LoginInput): UserPayload
    createUser(user: CreateUserInput): UserPayload
    updateUser(user: UpdateUserInput): UserPayload @auth
    follow(userId: String): FollowPayload @auth
    unfollow(userId: String): FollowPayload @auth

    # Article
    createArticle(article: CreateArticleInput): CreateArticlePayload @auth
    updateArticle(articleId: String, article: UpdateArticleInput): CreateArticlePayload @auth
    deleteArticle(articleId: String): DeleteArticlePayload @auth
    updateFavorite(articleId: String, op: String): SimplePayload @auth

    # Comment
    createComment(articleId: String, comment: CreateCommentInput): CreateCommentPayload @auth
    deleteComment(commentId: String): DeleteCommentPayload @auth
  }
`;
