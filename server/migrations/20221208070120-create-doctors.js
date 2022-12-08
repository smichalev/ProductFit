module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('doctors', {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				unique: true,
				defaultValue: Sequelize.UUIDV4,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: false,
			},
			specialization: {
				type: Sequelize.UUID,
				foreignKey: true,
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
		await queryInterface.dropTable('doctors');
	}
};