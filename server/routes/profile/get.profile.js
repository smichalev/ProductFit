const httpErrors = require('http-errors');

module.exports = (req, res, next) => {
	if (!req.session.user) {
		return next(httpErrors(401, 'Необходимо указать Ваши данные как пользователя'));
	}

	return res.status(200).json({
		data: req.session.user
	});
}