const path = require('path');
const httpErrors = require('http-errors');

const doctorsModel = require(path.join(__dirname, '..', '..', 'models', 'doctors'));

module.exports = async (req, res, next) => {
	const { specialization } = req.query;

	const doctors = await doctorsModel.findAll({
		include: [{
			association: 'Specialization',
			attributes: ['id', 'name'],
			where: {
				...(specialization && { id: specialization }),
			}
		}]
	});

	if (!doctors || !doctors.length) {
		return next(httpErrors(404, specialization ?
			'Не найден ни один врач с нужной специализацией' :
			'Не найден ни один врач'
		));
	}

	return res.status(200).json({
		data: doctors
	});
}