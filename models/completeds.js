'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Completeds extends Model {
    
    static associate(models) {
      // define association here
      Completeds.belongsTo(models.Users, {
        foreignKey: "studentId",
      })
      Completeds.belongsTo(models.Pages, {
        foreignKey: "pageId",
      })
    }

    static async markAsCompleted(studentId, pageId){
      return await this.findOrCreate(
        {
          where: {
            studentId, 
            pageId
          }
        }
      );
    }
  }
  Completeds.init({
    studentId: DataTypes.INTEGER,
    pageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Completeds',
  });
  return Completeds;
};