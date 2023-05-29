const users = require('../models/users');

const create = (u_name) => {
  users.create({
    username: u_name,
  });
};

module.exports = {
  create,
};
