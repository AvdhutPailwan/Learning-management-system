const express = require(`express`);

const userRouter = express.Router();

userRouter.get(`/signin`, () => {});
userRouter.get(`/signup`, () => {});

module.exports = userRouter;
