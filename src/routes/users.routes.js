const express = require(`express`);

const userRouter = express.Router();

userRouter.post(`/signin`, () => {});
userRouter.post(`/signup`, () => {});
userRouter.post(`/changepassword`, () => {});

module.exports = userRouter;
