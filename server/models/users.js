const path = require('path');
const { sequilize, Sequelize } = require(path.join(__dirname, '..', 'common', 'database'));

const Users = sequilize.define('users', {
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
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },
}, {
  timestamps: true,
});

module.exports = Users;