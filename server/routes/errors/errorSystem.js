module.exports = (err, req, res, next) => {
	if (!err) {
		return next();
	}

	return res.status(err.status).json({
		message: err.message || 'Неизвестная ошибка'
	});
}