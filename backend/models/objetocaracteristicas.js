'use strict';
import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'
class ObjetoCaracteristicas extends Model {
  static associate(models) { }
}
ObjetoCaracteristicas.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  idCaracteristica: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idObjetos: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'ObjetoCaracteristicas',
  tableName: 'objetocaracteristicas',
  
});
export default ObjetoCaracteristicas;
