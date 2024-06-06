const express = require(`express`);

const enrollmentRouter = express.Router();

enrollmentRouter.post(`/:studentId/:courseId`, () => {});

module.exports = enrollmentRouter;
