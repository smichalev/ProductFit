const moment = require('moment-timezone');
const httpErrors = require('http-errors');
const { validate } = require('uuid');
const path = require('path');
const doctorsModel = require(path.join(__dirname, '..', '..', 'models', 'doctors'));
const meetingsModel = require(path.join(__dirname, '..', '..', 'models', 'meetings'));
const Sequelize = require('sequelize');

module.exports = async (req, res, next) => {
	let { date, time, doctor } = req.body;

	if (!req.session.user) {
		return next(httpErrors(401, 'Только авторизованный пользователь может записываться на прием'));
	}

	if (!date || !moment(date, 'DD.MM.YYYY', true).isValid()) {
		return next(httpErrors(400, 'Некорректная дата'));
	}

	if (!time) {
		return next(httpErrors(400, 'Некорректное время'));
	}

	if (!doctor || !validate(doctor)) {
		return next(httpErrors(400, 'Некорректный UUID доктора'));
	}

	const doctorDB = await doctorsModel.findByPk(doctor);

	if (!doctorDB) {
		return next(httpErrors(400, 'Доктор не найден'));
	}

	const startDate = moment(new Date(date).setHours(time.split(' - ')[0].split(':')[0],0,0,0)).format('YYYY-DD-MM HH:mm:ss');
	const endDate = moment(new Date(date).setHours(time.split(' - ')[1].split(':')[0],0,0,0)).format('YYYY-DD-MM HH:mm:ss');

	const betweenDate = [
		startDate,
		endDate
	];

	const meetingsList = await meetingsModel.findAll({
		where: {
			doctor,
			start: {
				[Sequelize.Op.between]: betweenDate
			},
			end: {
				[Sequelize.Op.between]: betweenDate
			}
		}
	});

	if (meetingsList.length) {
		return next(httpErrors(400, 'Это время уже занято'));
	}

	const meetings = await meetingsModel.create({
		doctor,
		user: req.session.user.id,
		start: moment(startDate).subtract('hours', 1),
		end: moment(endDate).subtract('hours', 1)
	});

	res.status(201).json({ data: meetings });
}