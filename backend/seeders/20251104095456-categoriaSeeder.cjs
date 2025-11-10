'use strict';
const {categorias} = require('../factories/CategoriaFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categoriasDefault = await categorias()
    await queryInterface.bulkInsert('categoria', categoriasDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categoria', null, {})
  }
};
