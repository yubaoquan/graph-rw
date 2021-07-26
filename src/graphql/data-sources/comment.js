/* eslint-disable new-cap */
const { MongoDataSource } = require('apollo-datasource-mongodb');

module.exports = class Comment extends MongoDataSource {
  findById(commentId) {
    return this.model?.findById(commentId);
  }

  getComments(articleId, options) {
    return this.model?.find({ articleId }).skip(options.offset).limit(options.limit);
  }

  createComment(data) {
    const comment = new this.model(data);
    return comment.save();
  }

  deleteComment(commentId) {
    return this.model?.findOneAndDelete(commentId);
  }
};
