const { ApiError } = require(`../utils/ApiError`);

const verifyRoleEducator = (req, res, next) => {
  const { role } = req.user;
  if (role !== `educator`) {
    throw new ApiError(401, `Unauthorised Request`);
  }
  next();
};

module.exports = { verifyRoleEducator };
