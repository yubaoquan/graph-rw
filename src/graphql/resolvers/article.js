/* eslint-disable @typescript-eslint/no-unused-vars, no-underscore-dangle */
const { AuthenticationError } = require('apollo-server-core');

module.exports = {
  Query: {
    async articles(parent, args, ctx) {
      return { args };
    },
    async feed(parent, args, ctx) {
      return { args };
    },
    async getArticleById(parent, { articleId }, { dataSources }) {
      const article = dataSources.articles.findById(articleId);
      return { article };
    },
  },
  Mutation: {
    async createArticle(parent, { article }, { dataSources, user }) {
      article.author = user._id;
      const ret = await dataSources.articles.createArticle(article);
      return { article: ret };
    },
    async updateArticle(parent, { articleId, article }, { dataSources, user }) {
      const articleFromDb = await dataSources.articles.findById(articleId);
      if (!user._id.equals(articleFromDb.author._id)) throw new AuthenticationError('非原作者, 未授权');
      const ret = await dataSources.articles.updateById(articleId, article);
      return { article: ret };
    },
    async deleteArticle(parent, { articleId }, { dataSources, user }) {
      const articleFromDb = await dataSources.articles.findById(articleId);
      if (!user._id.equals(articleFromDb.author._id)) throw new AuthenticationError('非原作者, 未授权');
      await dataSources.articles.deleteById(articleId);
      return { success: true };
    },
    async updateFavorite(parent, { articleId, op }, { dataSources: { users, articles }, user }) {
      if (op === 'inc') {
        await Promise.all([
          users.addFavorite(user._id, articleId),
          articles.addFavorite(articleId),
        ]);
      } else {
        await Promise.all([
          users.removeFavorite(user._id, articleId),
          articles.removeFavorite(articleId),
        ]);
      }

      return { success: true };
    },
  },
  Article: {
    async author(parent, args, { dataSources }) {
      const author = await dataSources.users.findById(parent.author);
      return author;
    },
  },
  ArticlesPayload: {
    async articles(parent, args, { dataSources }) {
      const { offset, limit } = parent.args;
      const articles = await dataSources.articles.getArticles({ offset, limit });
      return articles;
    },
    async articlesCount(parent, arts, { dataSources }) {
      const articlesCount = await dataSources.articles.getCount();
      return articlesCount;
    },
  },
  FeedPayload: {
    async articles(parent, args, { dataSources, user }) {
      const { offset, limit } = parent.args;
      const { following: authorIds } = await dataSources.users.findById(user._id);
      console.info(authorIds);
      const articles = await dataSources.articles.feedArticles(authorIds, { offset, limit });
      return articles;
    },
    async articlesCount(parent, args, { dataSources, user }) {
      const { following: authorIds } = await dataSources.users.findById(user._id);
      const articlesCount = await dataSources.articles.getFeedCount(authorIds);
      return articlesCount;
    },
  },
};
