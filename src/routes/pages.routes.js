const express = require(`express`);
const { createAPage, updateAPage, deleteAPage } = require(`../controllers/pages.controllers`);

const pageRouter = express.Router();

pageRouter.post(`/create/:chapterId`, createAPage);
pageRouter.put(`/edit/:pageId`, updateAPage);
pageRouter.delete(`/delete/:pageId`, deleteAPage);
pageRouter.get(`/:pageId`, () => {});

module.exports = pageRouter;
