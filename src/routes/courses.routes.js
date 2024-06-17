const express = require(`express`);
const { createACourse, updateACourse, deleteACourse } = require(`../controllers/courses.controllers`);
const { verifyRoleEducator } = require(`../middlewares/educator.middleware`);

const coursesRouter = express.Router();

coursesRouter.get(`/courses`, () => {});
coursesRouter.post(`/create`, verifyRoleEducator, createACourse);
coursesRouter.put(`/edit`, verifyRoleEducator, updateACourse);
coursesRouter.delete(`/delete`, verifyRoleEducator, deleteACourse);
coursesRouter.get(`/:courseId`, () => {});

module.exports = coursesRouter;
