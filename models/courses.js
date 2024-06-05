'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    static associate(models) {
      Courses.belongsTo(models.Users, {
        foreignKey: "educatorId"
      });

      Courses.belongsToMany(models.Users, {
        through: "Enrollments"
      })

      Courses.hasMany(models.Chapters, {
        foreignKey: "courseId"
      })
    }
  }
  Courses.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Courses',
  });
  return Courses;
};