'use strict';
import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'
  class Puzzle extends Model {
    static associate(models) {}
  }
  Puzzle.init({
    nombre: DataTypes.STRING
  }, {
    sequelize:db,
    modelName: 'Puzzle',
    tableName: 'puzzles',
    timestamps: true
  });
export default Puzzle;