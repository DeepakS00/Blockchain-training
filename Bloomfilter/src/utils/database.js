require('dotenv').config();
const Sequelize = require('sequelize');
const sequilize = new Sequelize('blockchain-training', 'learner', process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequilize;
