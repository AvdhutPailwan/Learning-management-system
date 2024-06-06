const express = require(`express`);
const { getAllCourses } = require(`../controllers/courses.controllers.js`);

const coursesRouter = express.Router();

coursesRouter.get(`/:studentId`, getAllCourses);
coursesRouter.post(`/create/:educatorId`, () => {});
coursesRouter.put(`/edit/:courseId`, () => {});
coursesRouter.delete(`/delete/:courseId`, () => {});
coursesRouter.get(`/:courseId`, () => {});

module.exports = coursesRouter;
