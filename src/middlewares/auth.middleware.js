const { ApiError } = require(`../utils/ApiError`);
const { asyncHandler } = require(`../utils/asyncHandler`);
const jwt = require(`jsonwebtoken`);
const { Users } = require(`../../models`);

const verifyJwt = asyncHandler(async (req, _, next) => { // when there is unused field like `res` in this case place `_` in it's place
  try {
    const token = req.cookies?.accessToken || req.header(`Authorization`)?.split(` `)[1];

    if (!token) {
      throw new ApiError(401, `Unauthorized Request`);
    }

    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await Users.findByPk(decoded?.id, {
      attributes: { exclude: [`password`, `refreshToken`] }
    });

    if (!user) {
      throw new ApiError(401, `Invalid Access Token`);
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || `Invalid Access Token`);
  }
});

module.exports = { verifyJwt };
