'use strict';
import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'
class Estadistcas extends Model {
  static associate(models) {}
}
Estadistcas.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  usuId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sudokuJugados: DataTypes.INTEGER,
  sudokuGanados: DataTypes.INTEGER
}, {
  sequelize: db,
  modelName: 'Estadistcas',
  tableName: 'estadistcas',
  timestamps: true
});
export default Estadistcas;
