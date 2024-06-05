'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn("Chapters", "courseId", {
      type: Sequelize.DataTypes.INTEGER
    })
    queryInterface.addConstraint("Chapters", {
      fields: ["courseId"],
      type: "foreign key",
      references: {
        table: "Courses",
        field: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn("Chapters", "courseId");
  }
};
