const moment = require('moment-timezone');
const httpErrors = require('http-errors');
const { validate } = require('uuid');
const path = require('path');
const doctorsModel = require(path.join(__dirname, '..', '..', 'models', 'doctors'));
const meetingsModel = require(path.join(__dirname, '..', '..', 'models', 'meetings'));
const Sequelize = require('sequelize');

module.exports = async (req, res, next) => {
	let { date, time, doctor } = req.body;

	if (!req || !req.session || !req.session.user || !req.session.user) {
		return next(httpErrors(401, 'Только авторизованный пользователь может записываться на прием'));
	}

	if (!date || !moment(date, 'DD.MM.YYYY', true).isValid()) {
		return next(httpErrors(400, 'Некорректная дата'));
	}

	if (!time || !moment(time.split(' - ')[0], 'HH:mm', true).isValid() || !moment(time.split(' - ')[1], 'HH:mm', true).isValid()) {
		return next(httpErrors(400, 'Некорректное время'));
	}

	if (!doctor || !validate(doctor)) {
		return next(httpErrors(400, 'Некорректный UUID доктора'));
	}

	const doctorDB = await doctorsModel.findByPk(doctor);

	if (!doctorDB) {
		return next(httpErrors(400, 'Доктор не найден'));
	}

	const betweenDates = [
		moment(date + ' ' + time.split(' - ')[0]).add('hours', 3).format('YYYY-DD-MM HH:mm:ss') + '+04',
		moment(date + ' ' + time.split(' - ')[1]).add('hours', 3).format('YYYY-DD-MM HH:mm:ss') + '+04',
	];


	const meetingsList = await meetingsModel.findAll({
		where: {
			doctor,
			start: {
				[Sequelize.Op.between]: betweenDates
			},
			end: {
				[Sequelize.Op.between]: betweenDates
			}
		}
	});

	if (meetingsList.length) {
		return next(httpErrors(400, 'Это время уже занято'));
	}

	const meetings = await meetingsModel.create({
		doctor,
		user: req.session.user.id,
		start: betweenDates[0],
		end: betweenDates[1]
	});

	res.status(201).json({ data: meetings });
}