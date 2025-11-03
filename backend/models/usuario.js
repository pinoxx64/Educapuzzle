'use strict';
import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'
import UsuarioRol from "./usuariorol.js";
import Rol from "./rol.js"
import bcrypt from "bcrypt";

class Usuario extends Model {
  static associate(models) { }
}
Usuario.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  correo: {
    type: DataTypes.STRING,
    unique: true
  },
  contrasena: {
    type: DataTypes.STRING,
    set(value) {this.setDataValue('contrasena', bcrypt.hashSync(value, 10))}
  },
  puntuacion: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, { 
  hooks: {
    afterCreate: async (user, options) => {
      const rol = await Rol.findOne({ where: { nombre: 'Alumno' } })
      if (rol) {
        await UsuarioRol.create({ idUsu: user.id, idRol: rol.id })
      }
      return Promise.resolve()
    },
    afterBulkCreate: async (users, options) => {
      if (options.isSeeder) return
      const rol = await Rol.findOne({ where: { nombre: 'Alumno' } })
      if (rol) {
        for (const user of users) {
          await UsuarioRol.create({ idUsu: user.id, idRol: rol.id })
        }
      }
      return Promise.resolve()
    }
  },
  sequelize: db,
  modelName: 'Usuario',
  tableName: 'usuarios',
  timestamps: true,
  paranoid: true
});


export default Usuario;