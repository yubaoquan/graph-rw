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

  feedArticles(authorIds, options) {
    return this.model
      .find({ author: { $in: authorIds } })
      .skip(options.offset)
      .limit(options.limit);
  }

  getCount() {
    return this.model?.countDocuments();
  }

  getFeedCount(authorIds) {
    return this.model?.countDocuments({ author: { $in: authorIds } });
  }

  updateById(articleId, data) {
    return this.model.findOneAndUpdate({ _id: articleId }, data, { new: true });
  }

  deleteById(articleId) {
    return this.model?.findByIdAndDelete(articleId);
  }

  async addFavorite(articleId) {
    const article = await this.findOneById(articleId);
    article.favoritesCount += 1;
    return article.save();
  }

  async removeFavorite(articleId) {
    const article = await this.findOneById(articleId);
    article.favoritesCount -= 1;
    return article.save();
  }
};
