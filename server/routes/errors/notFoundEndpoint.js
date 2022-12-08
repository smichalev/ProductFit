const httpErrors = require('http-errors');

module.exports = (req, res) => {
	const { status, message } = new httpErrors(404, 'Endpoint не найден');

	return res.status(status).json({
		message
	});
}