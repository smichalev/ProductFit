const path = require('path');
const moment = require('moment-timezone');
const httpErrors = require('http-errors');
const Sequelize = require('sequelize');
const doctorsModel = require(path.join(__dirname, '..', '..', 'models', 'doctors'));
const meetingsModel = require(path.join(__dirname, '..', '..', 'models', 'meetings'));

module.exports = async (req, res, next) => {
	const { date } = req.query;

	if (!date || !moment(date, 'DD.MM.YYYY', true).isValid()) {
		return next(httpErrors(400, 'Некорректная дата'));
	}

	const doctor = await doctorsModel.findByPk(req.params.id);

	if (!doctor) {
		return next(httpErrors(404, 'Врач не найден'));
	}

	const betweenDate = [
		moment(new Date(date).setHours(0,0,0,0)).format('YYYY-DD-MM HH:mm:ss'),
		moment(new Date(date).setHours(23,59,59,59)).format('YYYY-DD-MM HH:mm:ss'),
	];

	const meetings = await meetingsModel.findAll({
		where: {
			doctor: doctor.id,
			start: {
				[Sequelize.Op.between]: betweenDate
			},
			end: {
				[Sequelize.Op.between]: betweenDate
			}
		},
	});

	const banDates = meetings.map(item => `${ moment(item.start).format('DD.MM.YYYY') } ${ moment(item.start).add('hours', 1).format('HH:mm') } - ${ moment(item.end).add('hours', 1).format('HH:mm') }`);

	const dateList = [...new Array(24)]
		.map((item, index) => index + 1)
		.filter(item => item <= 17 && item >= 8)
		.map(item => {
			return {
				date,
				time: `${item}:00 - ${ item + 1 }:00`,
				ban: banDates.includes(`${ date } ${item}:00 - ${ item + 1 }:00`)
			}
		});

	return res.status(200).json({ data: dateList });
}