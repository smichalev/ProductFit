module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('specializations', {
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
				unique: true,
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
		await queryInterface.dropTable('specializations');
	}
};