'use strict';
const { caracteristicas } = require('../factories/CaracteristicaFactory.cjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const caracteristicasDefault = await caracteristicas()
    await queryInterface.bulkInsert('caracteristicas', caracteristicasDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('caracteristicas', null, {})
  }
};
