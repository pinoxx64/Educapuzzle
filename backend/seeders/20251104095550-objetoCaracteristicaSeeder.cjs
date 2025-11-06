'use strict';
const { objetosCaracteristicas } = require('../factories/ObjetoCaracteristicaFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const objetoCaracteristicasDefault = await objetosCaracteristicas()
    await queryInterface.bulkInsert('objetocaracteristicas', objetoCaracteristicasDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('objetocaracteristicas', null, {})
  }
};
