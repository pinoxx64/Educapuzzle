'use strict';
const { puzzles } = require('../factories/PuzzleFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const puzzlesDefault = await puzzles()
    await queryInterface.bulkInsert('puzzles', puzzlesDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('puzzles', null, {})
  }
};
