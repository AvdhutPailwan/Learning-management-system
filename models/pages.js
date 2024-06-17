'use strict';
const {
  Model
} = require('sequelize');
const { Enrollments } = require(`.`);
module.exports = (sequelize, DataTypes) => {
  class Pages extends Model {
    static associate(models) {
      Pages.belongsTo(models.Chapters, {
        foreignKey: "chapterId"
      })

      Pages.belongsToMany(models.Users, { through: "Completeds",foreignKey: "pageId" })
    }

    static async createAPage(title, content, chapterId){
      return await this.create({title, content, chapterId});
    }

    static async updateAPage(title, content, pageId){
      return await this.update({title, content}, {
        where: {
          id: pageId,
        }
      })
    }

    static async deleteAPage(pageId){
      const enrollmentDeleted = await Enrollments.destroy({
        where: {
          pageId
        }
      })
      const pageDeleted = await this.destroy({
        where: {
          id: pageId
        }
      })

      return (enrollmentDeleted === 1 && pageDeleted === 1);
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