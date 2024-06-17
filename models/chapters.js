'use strict';
const {
  Model
} = require('sequelize');
const { Pages } = require(".");
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
      const pages = await Pages.findAll({
        where: {
          chapterId
        }
      });

      pages.forEach(async page => await Pages.deleteAPage(page.id));

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