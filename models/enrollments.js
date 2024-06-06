'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enrollments extends Model {
    
    static associate(models) {
      // define association here
      Enrollments.belongsTo(models.Users, {
        foreignKey: "studentId",
      })
      Enrollments.belongsTo(models.Courses, {
        foreignKey: "courseId",
      })
    }
  }
  Enrollments.init({
    studentId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Enrollments',
  });
  return Enrollments;
};