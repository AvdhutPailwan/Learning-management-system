const express = require(`express`);
const { createACourse, updateACourse, deleteACourse } = require(`../controllers/courses.controllers`);

const coursesRouter = express.Router();

coursesRouter.get(`/courses/:studentId`, () => {});
coursesRouter.post(`/create/:educatorId`, createACourse);
coursesRouter.put(`/edit/:courseId`, updateACourse);
coursesRouter.delete(`/delete/:courseId`, deleteACourse);
coursesRouter.get(`/:courseId`, () => {});

module.exports = coursesRouter;
