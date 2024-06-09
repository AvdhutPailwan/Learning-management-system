const express = require(`express`);
const { signUpUser, signInUser, signOutUser, refreshAccessToken, changeCurrentPassword } = require(`../controllers/users.controllers`);
const { verifyJwt } = require(`../middlewares/auth.middleware`);

const userRouter = express.Router();

userRouter.post(`/signin`, signInUser);
userRouter.post(`/signup`, signUpUser);
userRouter.post(`/changepassword`, verifyJwt, changeCurrentPassword);
userRouter.post(`/signout`, verifyJwt, signOutUser);
userRouter.post(`/refresh-token`, refreshAccessToken);

module.exports = userRouter;
