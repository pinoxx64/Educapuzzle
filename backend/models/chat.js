'use strict';
import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'
class Chat extends Model {
  static associate(models) { }
}
Chat.init({
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
  mensaje: DataTypes.STRING,
  temasId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'Chat',
  tableName: 'chats',
  timestamps: true
});
export default Chat;