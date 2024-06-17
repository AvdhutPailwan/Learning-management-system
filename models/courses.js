'use strict';
const {
  Model,
  where
} = require('sequelize');
const { Chapters, Completeds } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    static associate(models) {
      Courses.belongsTo(models.Users, {
        foreignKey: "educatorId"
      });

      Courses.belongsToMany(models.Users, {
        through: "Enrollments",
        foreignKey: "courseId",
      })

      Courses.hasMany(models.Chapters, {
        foreignKey: "courseId"
      })
    }
    static async createACourse(title, description, educatorId){
      return await this.create({title, description, educatorId});
    }
    static async updateACourse(title, description, courseId){
      return await this.update({title, description}, {
        where: {
          id: courseId,
        }
      })
    }
    static async deleteACourse(courseId){
      const chapters = await Chapters.findAll({
        where: {
          courseId
        }
      });

      chapters.forEach(async chapter => await Chapters.deleteAChapter(chapter.id));

      const completed = await Completeds.destroy({
        where: {
          courseId
        }
      });

      const course =  await this.destroy({
        where: {
          id: courseId
        }
      });

      return (course === 1 && completed === 1);
    }
  }
  Courses.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    educatorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Courses',
  });
  return Courses;
};