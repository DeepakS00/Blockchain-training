const Sequelize = require('sequelize');
const db = require('../utils/database');

const userModel = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = userModel;
