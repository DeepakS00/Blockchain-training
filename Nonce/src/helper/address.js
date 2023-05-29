const {getRandomInt} = require('./hash');

const create = (count) => {
  const addresses = {};
  for (let i = 0; i < count; i++) {
    const address = getRandomInt(8);
    addresses[address] = {failed: [], nonce: 0};
  }
  return addresses;
};

module.exports = {
  create,
};
