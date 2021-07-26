/* eslint-disable no-underscore-dangle */
const { AuthenticationError } = require('apollo-server-core');

module.exports = {
  Query: {
    async getComments(parent, { articleId, offset, limit }, { dataSources }) {
      const comments = await dataSources.comments.getComments(articleId, { offset, limit });
      return { comments };
    },
  },
  Mutation: {
    async createComment(parent, { comment }, { dataSources, user }) {
      comment.author = user._id;
      const ret = await dataSources.comments.createComment(comment);
      return { comment: ret };
    },
    async deleteComment(parent, { commentId }, { dataSources, user }) {
      const userId = user._id;
      const comment = await dataSources.comments.findById(commentId);
      if (!comment) throw new Error('无此评论');

      const article = await dataSources.articles.findById(comment.articleId);

      // 不是文章作者也不是评论作者
      if (!article.author.equals(userId) && !comment.author.equals(userId)) {
        throw new AuthenticationError('未授权');
      }
      const ret = await dataSources.comments.deleteComment(commentId);
      console.info(ret);

      return { success: true, comment: ret };
    },
  },
};
