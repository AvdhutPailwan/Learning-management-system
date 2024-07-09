const express = require(`express`);
const { markAsCompleted } = require("../controllers/completed.controllers");

const completedRouter = express.Router();

completedRouter.post(`/:pageId`, markAsCompleted);

module.exports = completedRouter;
