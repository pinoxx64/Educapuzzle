'use strict';
const { objetoCaracteristica } = require('../factories/ObjetoCaracteristicaFactory.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const objetoCaracteristicasDefault = await objetoCaracteristica()
    await queryInterface.bulkInsert('objetocaracteristica', objetoCaracteristicasDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('objetocaracteristica', null, {})
  }
};
