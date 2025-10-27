'use strict';
import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'
class Categoria extends Model {
  static associate(models) { }
}
Categoria.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  idCreador: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idPuzzle: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: DataTypes.STRING
}, {
  sequelize: db,
  modelName: 'Categoria',
  tableName: 'categoria',
  timestamps: true
});
export default Categoria;