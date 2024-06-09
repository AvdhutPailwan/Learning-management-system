const express = require(`express`);
const { createAPage, updateAPage, deleteAPage } = require(`../controllers/pages.controllers`);
const { verifyRoleEducator } = require(`../middlewares/educator.middleware`);

const pageRouter = express.Router();

pageRouter.post(`/create/:chapterId`, verifyRoleEducator, createAPage);
pageRouter.put(`/edit/:pageId`, verifyRoleEducator, updateAPage);
pageRouter.delete(`/delete/:pageId`, verifyRoleEducator, deleteAPage);
pageRouter.get(`/:pageId`, () => {});

module.exports = pageRouter;
