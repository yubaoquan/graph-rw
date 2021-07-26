/* eslint-disable new-cap */
const { MongoDataSource } = require('apollo-datasource-mongodb');

module.exports = class Article extends MongoDataSource {
  createArticle(data) {
    const article = new this.model(data);
    return article.save(article);
  }

  getById(id) {
    return this.findOneById(id);
  }

  getArticles(options) {
    return this.model?.find().skip(options.offset).limit(options.limit);
  }

  getCount() {
    return this.model?.countDocuments();
  }

  updateById(articleId, data) {
    return this.model.findOneAndUpdate({ _id: articleId }, data, { new: true });
  }

  deleteById(articleId) {
    return this.model?.findByIdAndDelete(articleId);
  }
};
