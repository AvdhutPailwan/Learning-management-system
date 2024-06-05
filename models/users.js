'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsToMany(models.Courses, {through: "Enrollments"})
      Users.belongsToMany(models.Pages, {through: "Completed"})
      Users.hasMany(models.Courses, {
        foreignKey: "educatorId"
      })
    }
  }
  Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};