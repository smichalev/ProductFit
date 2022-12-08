'use strict';

const path = require('path');
const moment = require('moment-timezone');
const Specializations = require(path.join(__dirname, '..', 'models', 'specializations'));
const Doctors = require(path.join(__dirname, '..', 'models', 'doctors'));
const Users = require(path.join(__dirname, '..', 'models', 'users'));
const Meetings = require(path.join(__dirname, '..', 'models', 'meetings'));

module.exports = {
	async up (queryInterface, Sequelize) {
		try {
			const specializations = await Specializations.findAll();
			const doctors = await Doctors.findAll({
				limit: 1,
			});
			const users = await Users.findAll({
				limit: 1
			});

			const meetings = doctors.length && users.length ? [{
				doctor: doctors[0].id,
				user: users[0].id,
				happened: false,
				start: moment().set({ minute: 0, seconds: 0 }).format(),
				end: moment().set({ minute: 0, seconds: 0 }).add('hours', 1).format()
			}] : [];

			await Promise.all(meetings.map((meeting) => Meetings.create(meeting)));
		} catch (e) {
			console.error(e.message);
		}
	},

	async down (queryInterface, Sequelize) {
		return queryInterface.bulkDelete('meetings', null, {});
	}
};
