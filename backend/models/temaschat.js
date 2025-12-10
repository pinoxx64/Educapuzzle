'use strict';
import { DataTypes, Model } from "sequelize";
import db from "../database/Connection.js";

class TemasChat extends Model {
  static associate(models) { }
}
TemasChat.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  nombre: DataTypes.STRING
}, {
  sequelize: db,
  modelName: 'TemasChats',
  tableName: 'temaschats'
});

export default TemasChat;
