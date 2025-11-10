'use strict';
import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'
class Caracteristicas extends Model {
  static associate(models) { }
}
Caracteristicas.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  idCategoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: DataTypes.STRING
}, {
  sequelize: db,
  modelName: 'Caracteristicas',
  tableName: 'caracteristicas',
  timestamps: true
});
export default Caracteristicas;
