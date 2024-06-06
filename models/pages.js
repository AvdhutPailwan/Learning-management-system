'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pages extends Model {
    static associate(models) {
      Pages.belongsTo(models.Chapters, {
        foreignKey: "chapterId"
      })

      Pages.belongsToMany(models.Users, { through: "Completeds",foreignKey: "pageId" })
    }
  }
  Pages.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    chapterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pages',
  });
  return Pages;
};