'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Completed extends Model {
    
    static associate(models) {
      // define association here
      Completed.belongsTo(models.Users, {
        foreignKey: "studentId",
      })
      Completed.belongsTo(models.Pages, {
        foreignKey: "pageId",
      })
    }
  }
  Completed.init({
    studentId: DataTypes.INTEGER,
    pageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Completed',
  });
  return Completed;
};