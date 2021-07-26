const { AuthenticationError } = require('apollo-server-core');

/* eslint-disable no-underscore-dangle */
module.exports = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async articles(parent, args, { dataSources }) {
      return { args };
    },
    async getArticleById(parent, { articleId }, { dataSources }) {
      const article = dataSources.articles.getById(articleId);
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
      const articleFromDb = await dataSources.articles.getById(articleId);
      if (!user._id.equals(articleFromDb.author._id)) throw new AuthenticationError('非原作者, 未授权');
      const ret = await dataSources.articles.updateById(articleId, article);
      return { article: ret };
    },
    async deleteArticle(parent, { articleId }, { dataSources, user }) {
      const articleFromDb = await dataSources.articles.getById(articleId);
      if (!user._id.equals(articleFromDb.author._id)) throw new AuthenticationError('非原作者, 未授权');
      const ret = await dataSources.articles.deleteById(articleId);
      console.info(ret);
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
};
