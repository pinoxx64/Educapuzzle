'use strict';
const { temasChats } = require('../factories/TemasChatsFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const temasChatsDefault = await temasChats()
    await queryInterface.bulkInsert('temasChats', temasChatsDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('temasChats', null, {})
  }
};
