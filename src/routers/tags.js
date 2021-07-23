const router = require('express').Router();
const tagCtrl = require('../controllers/tags');

router.get('/tags', tagCtrl.getTags);

module.exports = router;
