const path = require('path');
const Sequelize = require('sequelize');

const config = require(path.join(__dirname, '..', 'config', 'config'));

const sequilize = new Sequelize(config);

module.exports = { Sequelize, sequilize };