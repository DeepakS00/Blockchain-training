const crypto = require('crypto');

function generateHash(data) {
  return crypto.createHash('sha256').update(data).digest().toString('hex');
}

module.exports = generateHash;
