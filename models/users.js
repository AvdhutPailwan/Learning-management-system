'use strict';
const jwt = require(`jsonwebtoken`);
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsToMany(models.Courses, {through: "Enrollments", foreignKey: "studentId"})
      Users.belongsToMany(models.Pages, {through: "Completeds", foreignKey: "studentId"})
      Users.hasMany(models.Courses, {
        foreignKey: "educatorId"
      })
    }

    async isPasswordCorrect(password){
      return await bcrypt.compare(password, this.password);
    }

    async generateAccessToken(){
      return await jwt.sign(
        {
          id: this.id,
          email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      )
    }

    async generateRefreshToken(){
      return await jwt.sign(
        {
          id: this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
      )
    }

  }
  Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Users',
    hooks: {
      beforeSave: async (user) => {
        if(user.changed('password')){
          user.password = await bcrypt.hash(user.password, 10);
        }
        return user.password;
      }
    }
  },

);
  return Users;
};