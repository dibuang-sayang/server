'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Offices', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'add-fk-to-userid',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Offices', 'add-fk-to-userid')
  }
};
