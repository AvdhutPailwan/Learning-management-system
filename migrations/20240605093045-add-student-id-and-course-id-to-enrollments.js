'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Enrollments", {
      studentId: {
        type: Sequelize.DataTypes.INTEGER,
      },
      courseId: {
        type: Sequelize.DataTypes.INTEGER,
      }
    })

    await queryInterface.addConstraint("Enrollments", {
      fields: ["studentId", "courseId"],
      type: "primary key"
    })

    await queryInterface.addConstraint("Enrollments", {
      fields: ["studentId"],
      type: "foreign key",
      references: {
        table: "Users",
        field: "id"
      }
    })

    await queryInterface.addConstraint("Enrollments", {
      fields: ["courseId"],
      type: "foreign key",
      references: {
        table: "Courses",
        field: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    
  }
};
