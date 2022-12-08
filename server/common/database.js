const path = require('path');
const Sequelize = require('sequelize');

const config = require(path.join(__dirname, '..', 'config', 'config'));

const sequilize = new Sequelize(config);

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
	date = this._applyTimezone(date, options);

	return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

module.exports = { Sequelize, sequilize };