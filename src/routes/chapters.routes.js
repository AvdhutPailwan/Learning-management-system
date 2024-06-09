const express = require(`express`);
const { createAChapter, updateAChapter, deleteAChapter } = require(`../controllers/chapters.controller`);
const { verifyRoleEducator } = require(`../middlewares/educator.middleware`);

const chaptersRouter = express.Router();

chaptersRouter.post(`/create/:courseId`, verifyRoleEducator, createAChapter);
chaptersRouter.put(`/edit/:chapterId`, verifyRoleEducator, updateAChapter);
chaptersRouter.delete(`/delete/:chapterId`, verifyRoleEducator, deleteAChapter);
chaptersRouter.get(`/:chapterId`, () => {});

module.exports = chaptersRouter;
