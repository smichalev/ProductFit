const path = require('path');
const { sequilize, Sequelize } = require(path.join(__dirname, '..', 'common', 'database'));

const Specializations = sequilize.define('specializations', {
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
}, {
	timestamps: true,
});

module.exports = Specializations;