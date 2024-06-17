const express = require(`express`);
const { createAPage, updateAPage, deleteAPage } = require(`../controllers/pages.controllers`);
const { verifyRoleEducator } = require(`../middlewares/educator.middleware`);

const pageRouter = express.Router();

pageRouter.post(`/create`, verifyRoleEducator, createAPage);
pageRouter.put(`/edit`, verifyRoleEducator, updateAPage);
pageRouter.delete(`/delete`, verifyRoleEducator, deleteAPage);
pageRouter.get(`/:pageId`, () => {});

module.exports = pageRouter;
