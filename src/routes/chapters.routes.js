const express = require(`express`);
const { createAChapter, updateAChapter, deleteAChapter, getAChapter } = require(`../controllers/chapters.controller`);
const { verifyRoleEducator } = require(`../middlewares/educator.middleware`);

const chaptersRouter = express.Router();

chaptersRouter.post(`/create`, verifyRoleEducator, createAChapter);
chaptersRouter.put(`/edit`, verifyRoleEducator, updateAChapter);
chaptersRouter.delete(`/delete`, verifyRoleEducator, deleteAChapter);
chaptersRouter.get(`/:chapterId`, getAChapter);

module.exports = chaptersRouter;
