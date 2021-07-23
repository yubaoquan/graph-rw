const router = require('express').Router();
const profileCtrl = require('../controllers/profiles');

router.get('/profiles/:username', profileCtrl.getProfile);
router.post('/profiles/:username/follow', profileCtrl.followUser);
router.delete('/profiles/:username', profileCtrl.unfollowUser);

module.exports = router;
