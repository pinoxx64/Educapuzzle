'use strict';
const { estadisticas } = require('../factories/EstadisticasFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estadisticasDefault = await estadisticas()
    await queryInterface.bulkInsert('estadistcas', estadisticasDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('estadistcas', null, {})
  }
};
