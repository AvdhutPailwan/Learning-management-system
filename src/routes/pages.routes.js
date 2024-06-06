const express = require(`express`);

const pageRouter = express.Router();

pageRouter.post(`/create/:chapterId`, () => {});
pageRouter.put(`/edit/:pageId`, () => {});
pageRouter.delete(`/delete/:pageId`, () => {});
pageRouter.get(`/:pageId`, () => {});

module.exports = pageRouter;
