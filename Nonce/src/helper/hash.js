const crypto = require('crypto');

const generateHash = (data) => {
  return crypto.createHash('sha256').update(data).digest().toString('hex');
};

const getRandomInt = (size) => {
  const value = crypto.randomBytes(16);
  return value.toString('hex');
};

module.exports = {
  generateHash,
  getRandomInt,
};
