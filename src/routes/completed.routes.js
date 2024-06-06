const express = require(`express`);

const completedRouter = express.Router();

completedRouter.post(`/:studentId/:chapterId`, () => {});

module.exports = completedRouter;
