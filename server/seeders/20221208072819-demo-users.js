'use strict';

const path = require('path');
const Users = require(path.join(__dirname, '..', 'models', 'users'));

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const users = [{
        name: 'Шевченко Иван Андреевич',
        phone: '+79277777777',
      }]

      await Promise.all(users.map((user) => Users.create(user)))
    } catch (e) {
      console.error(e.message)
    }
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
