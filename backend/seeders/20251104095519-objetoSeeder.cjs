'use strict';
const { objetos } = require('../factories/ObjetoFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const objetosDefault = await objetos()
    await queryInterface.bulkInsert('objetos', objetosDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('objetos', null, {})
  }
};
