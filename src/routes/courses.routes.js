const express = require(`express`);
const { createACourse, updateACourse, deleteACourse } = require(`../controllers/courses.controllers`);
const { verifyRoleEducator } = require(`../middlewares/educator.middleware`);

const coursesRouter = express.Router();

coursesRouter.get(`/courses/:studentId`, () => {});
coursesRouter.post(`/create/:educatorId`, verifyRoleEducator, createACourse);
coursesRouter.put(`/edit/:courseId`, verifyRoleEducator, updateACourse);
coursesRouter.delete(`/delete/:courseId`, verifyRoleEducator, deleteACourse);
coursesRouter.get(`/:courseId`, () => {});

module.exports = coursesRouter;
