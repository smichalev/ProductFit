const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');

const meetingsModel = require(path.join(__dirname, 'models', 'meetings'));

module.exports = () => {
	setInterval(async () => {
		const todayMeetings = await meetingsModel.findAll({
			include: [{
				association: 'Doctor',
				attributes: ['id', 'name'],
			}, {
				association: 'User',
				attributes: ['id', 'name'],
			}],
			where: {
				start: moment().add('hours', 24).format('YYYY-DD-MM HH:mm:ss')
			}
		});

		const twoHourMeetings = await meetingsModel.findAll({
			include: [{
				association: 'Doctor',
				attributes: ['id', 'name'],
			}, {
				association: 'User',
				attributes: ['id', 'name'],
			}],
			where: {
				start: moment().add('hours', 2).format('YYYY-DD-MM HH:mm:ss')
			}
		});

		for (const item of todayMeetings) {
			const msg = `${ moment().format('DD.MM.YYYY') } | Привет ${ item.User.name }! Напоминаем что вы записаны к ${ item.Doctor.name } завтра в ${ item.start }!`;

			fs.appendFile(path.join(__dirname, 'log.txt'), msg + '\n', (err) => {
				if (err) throw err;
			});
		}

		for (const item of twoHourMeetings) {
			const msg = `${ moment().format('DD.MM.YYYY') } | Привет ${ item.User.name }! Вам через 2 часа к ${ item.Doctor.name } в ${ item.start }!`;

			fs.appendFile(path.join(__dirname, 'log.txt'), msg + '\n', (err) => {
				if (err) throw err;
			});
		}
	}, 1000 * 60)
}