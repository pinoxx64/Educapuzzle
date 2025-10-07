'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsuarioRol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsuarioRol.init({
    idUsu: DataTypes.INTEGER,
    idRol: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsuarioRol',
  });
  return UsuarioRol;
};