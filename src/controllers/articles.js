exports.getArticles = async (req, res) => {
  res.send('getArticles');
};

exports.feedArticles = async (req, res) => {
  res.send('feedArticles');
};

exports.getArticle = async (req, res) => {
  res.send('getArticle');
};

exports.createArticle = async (req, res) => {
  res.send('createArticle');
};

exports.updateArticle = async (req, res) => {
  res.send('updateArticle');
};

exports.deleteArticle = async (req, res) => {
  res.send('deleteArticle');
};

exports.addComments = async (req, res) => {
  res.send('addComments');
};

exports.getComments = async (req, res) => {
  res.send('getComments');
};

exports.deleteComment = async (req, res) => {
  res.send('deleteComment');
};

exports.favoriteArticle = async (req, res) => {
  res.send('favoriteArticle');
};

exports.unfavoriteArticle = async (req, res) => {
  res.send('unfavoriteArticle');
};
