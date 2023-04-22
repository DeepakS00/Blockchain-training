const services = require('../services/user');
const bloomFilter = require('../utils/bloomFilter');

const userBloomFilter = new bloomFilter(20, 0.05);

const addUser = async (req, res) => {
  try {
    const {username} = req.body;
    if (!username) throw new Error('username not found');
    const userExists = userBloomFilter.contains(username);
    if (userExists) throw new Error(`${username} may exist`);
    services.create(username);
    userBloomFilter.add(username);
    res.json({message: `${username} has been added`});
  } catch (err) {
    res.json({message: err.message});
  }
};

module.exports = {
  addUser,
};
