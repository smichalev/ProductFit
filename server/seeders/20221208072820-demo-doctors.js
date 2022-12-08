'use strict';

const path = require('path');
const Specializations = require(path.join(__dirname, '..', 'models', 'specializations'));
const Doctors = require(path.join(__dirname, '..', 'models', 'doctors'));

module.exports = {
	async up (queryInterface, Sequelize) {
		try {
			const specializations = await Specializations.findAll();

			const doctors = [
				{ name: 'Попов Петр Николаевич' },
				{ name: 'Николаев Николай Сергеевич' },
				{ name: 'Светличная Мария Сергеевна' },
				{ name: 'Иванов Иван Иванович' },
				{ name: 'Васильева Ирина Ивановна' },
				{ name: 'Сидорова Елена Вячеславовна' },
				{ name: 'Петров Петр Петрович' },
				{ name: 'Никифоров Евгений Иванович' },
			].map((doctor) => {
				return {
					...doctor,
					specialization: specializations[Math.floor(Math.random()*specializations.length)].id
				}
			});

			await Promise.all(doctors.map((doctor) => Doctors.create(doctor)));
		} catch (e) {
			console.error(e.message);
		}
	},

	async down (queryInterface, Sequelize) {
		return queryInterface.bulkDelete('doctors', null, {});
	}
};
