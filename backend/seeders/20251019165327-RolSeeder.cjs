'use strict';
const {roles} = require('../factories/RolFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const rolesDefault = await roles()
    await queryInterface.bulkInsert('rols', rolesDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rols', null, {})
  }
};
