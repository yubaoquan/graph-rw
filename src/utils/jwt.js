const { promisify } = require('util');

const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpireTime } = require('../config/config.default');

const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

exports.sign = (obj) => {
  try {
    return sign(obj, jwtSecret, { expiresIn: jwtExpireTime });
  } catch (e) {
    console.error(e);
  }
};

exports.verify = (str) => {
  try {
    return verify(str, jwtSecret);
  } catch (e) {
    console.error(e);
  }
};

exports.decode = jwt.decode;
