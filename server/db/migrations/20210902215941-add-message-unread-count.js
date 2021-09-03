'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return  queryInterface.addColumn('messages', 'unread', {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('messages', 'unread')
  }
};
