'use strict';
import { caracteristica } from '../factories/CaracteristicaFactory.js'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const caracteristicasDefault = await caracteristica()
    await queryInterface.bulkInsert('caracteristicas', caracteristicasDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('caracteristicas', null, {})
  }
};
