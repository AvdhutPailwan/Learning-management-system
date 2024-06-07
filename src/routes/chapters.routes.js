const express = require(`express`);
const { createAChapter, updateAChapter, deleteAChapter } = require(`../controllers/chapters.controller.js`);

const chaptersRouter = express.Router();

chaptersRouter.post(`/create/:courseId`, createAChapter);
chaptersRouter.put(`/edit/:chapterId`, updateAChapter);
chaptersRouter.delete(`/delete/:chapterId`, deleteAChapter);
chaptersRouter.get(`/:chapterId`, () => {});

module.exports = chaptersRouter;
