const router = require('express').Router();
const userCtrl = require('../controllers/users');

router.post('/users/login', userCtrl.login);
router.post('/users', userCtrl.register);
router.get('/user', userCtrl.getCurrentUser);
router.put('/user', userCtrl.updateUser);

module.exports = router;
