'use strict';
const {usuarios} = require('../factories/UsuariosFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const usuariosDefaulf = await usuarios()
    await queryInterface.bulkInsert('usuarios', usuariosDefaulf, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {})
  }
};
