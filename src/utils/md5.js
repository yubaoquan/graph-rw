const crypto = require('crypto');
const { salt: defaultSalt } = require('../config/config.default');

const md5 = (str) => crypto.createHash('md5').update(str).digest('hex');

const saltMd5 = (str, salt = defaultSalt) => md5(`${str}${salt}`);

module.exports = { md5, saltMd5 };
