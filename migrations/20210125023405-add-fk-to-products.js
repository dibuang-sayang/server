'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Products', {
      fields: ['OfficeId'],
      type: 'foreign key',
      name: 'add-fk-to-officeid',
      references: {
        table: 'Offices',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Products', 'add-fk-to-officeid')
  }
};
