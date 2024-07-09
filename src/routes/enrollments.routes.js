const express = require(`express`);
const { enrollInACourse } = require("../controllers/enrollments.controllers");

const enrollmentRouter = express.Router();

enrollmentRouter.post(`/:courseId`, enrollInACourse);

module.exports = enrollmentRouter;
