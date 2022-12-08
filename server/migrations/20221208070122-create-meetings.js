module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('meetings', {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				unique: true,
				defaultValue: Sequelize.UUIDV4,
			},
			doctor: {
				type: Sequelize.UUID,
				allowNull: false,
				unique: false,
				foreignKey: true,
			},
			user: {
				type: Sequelize.UUID,
				allowNull: false,
				unique: false,
				foreignKey: true,
			},
			happened: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				unique: false,
				defaultValue: false,
			},
			start: {
				type: Sequelize.DATE,
				allowNull: false,
				unique: false,
			},
			end: {
				type: Sequelize.DATE,
				allowNull: false,
				unique: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('meetings');
	}
};