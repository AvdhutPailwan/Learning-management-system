'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chapters extends Model {
    static associate(models) {
      Chapters.belongsTo(models.Courses, {
        foreignKey: "courseId",
      })

      Chapters.hasMany(models.Pages, {
        foreignKey: "chapterId"
      })
    }
  }
  Chapters.init({
    title: DataTypes.STRING,
    courseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chapters',
  });
  return Chapters;
};