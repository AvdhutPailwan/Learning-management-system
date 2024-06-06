const express = require(`express`);

const chaptersRouter = express.Router();

chaptersRouter.post(`/create/:crouseId`, () => {});
chaptersRouter.put(`/edit/:chapterId`, () => {});
chaptersRouter.delete(`/delete/:chapterId`, () => {});
chaptersRouter.get(`/:chapterId`, () => {});


module.exports = chaptersRouter;
