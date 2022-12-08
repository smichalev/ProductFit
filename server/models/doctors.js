const path = require('path');
const { sequilize, Sequelize } = require(path.join(__dirname, '..', 'common', 'database'));

const Specializations = require(path.join(__dirname, 'specializations'));

const Doctors = sequilize.define('doctors', {
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
}, {
	timestamps: true,
});

Doctors.belongsTo(Specializations, {
	hooks: false,
	as: 'Specialization',
	foreignKey: 'specialization',
	targetKey: 'id'
});

module.exports = Doctors;