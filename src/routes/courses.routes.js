const express = require(`express`);
const { createACourse, updateACourse, deleteACourse, viewAvailableAndEnrolledCourses, getCourse } = require(`../controllers/courses.controllers`);
const { verifyRoleEducator } = require(`../middlewares/educator.middleware`);

const coursesRouter = express.Router();

coursesRouter.get(`/courses`, viewAvailableAndEnrolledCourses);
coursesRouter.post(`/create`, verifyRoleEducator, createACourse);
coursesRouter.put(`/edit`, verifyRoleEducator, updateACourse);
coursesRouter.delete(`/delete`, verifyRoleEducator, deleteACourse);
coursesRouter.get(`/:courseId`, getCourse);

module.exports = coursesRouter;
