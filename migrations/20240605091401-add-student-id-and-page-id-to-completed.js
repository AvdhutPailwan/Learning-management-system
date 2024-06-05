'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Completed", {
      studentId: {
        type: Sequelize.INTEGER,
      },
      pageId: {
        type: Sequelize.INTEGER,
      }
    })
    await queryInterface.addConstraint("Completed", {
      fields: ["studentId", "pageId"],
      type: "primary key"
    })
    await queryInterface.addConstraint("Completed", {
      fields: ["studentId"],
      type: "foreign key",
      references: {
        table: "Users",
        field: "id"
      }
    })
    await queryInterface.addConstraint("Completed", {
      fields: ["pageId"],
      type: "foreign key",
      references: {
        table: "Pages",
        field: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Completed");
  }
};
