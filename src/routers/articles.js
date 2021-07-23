const router = require('express').Router();
const articleCtrl = require('../controllers/articles');

router.get('/articles', articleCtrl.getArticles);
router.get('/articles/feed', articleCtrl.feedArticles);
router.get('/articles/:slug', articleCtrl.getArticle);
router.post('/articles', articleCtrl.createArticle);
router.put('/articles/:slug', articleCtrl.updateArticle);
router.delete('/articles/:slug', articleCtrl.deleteArticle);
router.post('/articles/:slug/comments', articleCtrl.addComments);
router.get('/articles/:slug/comments', articleCtrl.getComments);
router.delete('/articles/:slug/comments/:id', articleCtrl.deleteComment);
router.post('/articles/:slug/favorite', articleCtrl.favoriteArticle);
router.delete('/articles/:slug/favorite', articleCtrl.unfavoriteArticle);

module.exports = router;
