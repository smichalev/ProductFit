'use strict';

const path = require('path');
const Specializations = require(path.join(__dirname, '..', 'models', 'specializations'));

module.exports = {
	async up (queryInterface, Sequelize) {
		try {
			const specializations = [{
					name: 'Терапевт',
				},
				{
					name: 'Отоларинголог',
				},
				{
					name: 'Гастроэнтеролог',
				},
				{
					name: 'Окулист',
				},
				{
					name: 'Стоматолог',
				}]

			await Promise.all(specializations.map((specialization) => Specializations.create(specialization)))
		} catch (e) {
			console.error(e.message);
		}
	},

	async down (queryInterface, Sequelize) {
		return queryInterface.bulkDelete('specializations', null, {});
	}
};
