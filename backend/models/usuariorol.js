'use strict';

import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'

class UsuarioRol extends Model {
  static associate(models) { }
}
UsuarioRol.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  idUsu: {
    type: DataTypes.BIGINT,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  idRol: {
    type: DataTypes.BIGINT,
    references: {
      model: 'rols',
      key: 'id'
    }
  }
}, {
  sequelize: db,
  modelName: 'UsuarioRol',
  tableName: 'usuariorols',
  timestamps: true
})

export default UsuarioRol;