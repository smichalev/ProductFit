const path = require('path');
const httpErrors = require('http-errors');
const specializationsModel = require(path.join(__dirname, '..', '..', 'models', 'specializations'));

module.exports = async (req, res, next) => {
	const specializations = await specializationsModel.findAll();

	if (!specializations || !specializations.length) {
		return next(httpErrors(404, 'Не найдена ни одна специализация'));
	}

	return res.status(200).json({
		data: specializations
	});
}