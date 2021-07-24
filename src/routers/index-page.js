const router = require('express').Router();
const indexCtrl = require('../controllers/index-page');

router.get('/', indexCtrl.index);

module.exports = router;
