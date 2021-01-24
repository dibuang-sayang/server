'use strict';
const { encode } = require('../helpers/passHelper')
const data = require('./users.json')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    data.forEach(e => {
      e.password = encode(e.password)
      e.createdAt = new Date()
      e.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Users', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};