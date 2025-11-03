'use strict';
const {usuarios} = require('../factories/UsuariosFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const usuarioModel = await import('../models/usuario.js')
    const Usuario = usuarioModel.default

    const rolModel = await import('../models/rol.js')
    const Rol = rolModel.default

    const UsuarioRolModel = await import('../models/usuariorol.js')
    const UsuarioRol = UsuarioRolModel.default

    const usuariosDefaulf = await usuarios()

    for ( const usuario of usuariosDefaulf ) {
      const usuarioCreado = await Usuario.create({
        name: usuario.name,
        correo: usuario.correo,
        contrasena: usuario.contrasena,
        puntuacion: usuario.puntuacion
      }, { isSeeder: true })

      if (usuario.roles) {
        const roles = await Rol.findAll({where: { nombre: usuario.roles }})

        for (const rol of roles) {
          await UsuarioRol.create({ idUsu: usuarioCreado.dataValues.id, idRol: rol.dataValues.id })
        }
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {})
  }
};
