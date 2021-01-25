'use strict';
const data = require('./office.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    data.forEach((e) => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Offices', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Offices', null, {});
  },
};
