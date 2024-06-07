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

    static async createAChapter(title, courseId){
      return await this.create({title, courseId});
    }

    static async updateAChapter(title, chapterId){
      return await this.update({title}, {
        where: {
          id: chapterId,
        }
      })
    }

    static async deleteAChapter(chapterId){
      return await this.destroy({
        where: {
          id: chapterId
        }
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