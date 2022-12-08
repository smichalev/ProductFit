const path = require('path');

const errorSystem = require(path.join(__dirname, 'errorSystem'));
const notFoundEndpoint = require(path.join(__dirname, 'notFoundEndpoint'));

module.exports = {
	errorSystem,
	notFoundEndpoint,
}