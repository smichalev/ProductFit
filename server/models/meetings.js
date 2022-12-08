const path = require('path');
const { sequilize, Sequelize } = require(path.join(__dirname, '..', 'common', 'database'));

const Doctors = require(path.join(__dirname, 'doctors'));
const Users = require(path.join(__dirname, 'users'));

const Meetings = sequilize.define('meetings', {
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
}, {
	timestamps: true,
});

Meetings.belongsTo(Doctors, {
	hooks: false,
	as: 'Doctor',
	foreignKey: 'doctor',
	targetKey: 'id'
});

Meetings.belongsTo(Users, {
	hooks: false,
	as: 'User',
	foreignKey: 'user',
	targetKey: 'id'
});

module.exports = Meetings;