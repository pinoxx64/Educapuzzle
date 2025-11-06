'use strict';
import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'
class Objeto extends Model {
  static associate(models) { }
}
Objeto.init({
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
  modelName: 'Objetos',
  tableName: 'objetos',
  timestamps: true
});
export default Objeto;
