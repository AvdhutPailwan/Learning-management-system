const { Users } = require(`../../models`);
const { ApiError } = require(`../utils/ApiError`);
const { ApiResponse } = require(`../utils/ApiResponse`);
const { asyncHandler } = require(`../utils/asyncHandler`);
const jwt = require(`jsonwebtoken`);

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await Users.findByPk(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({
      hooks: false
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, `Something went wrong while generating tokens`);
  }
};
const signUpUser = asyncHandler(async (req, res) => {
  /**
   * 0. get user details from frontend
   * 1. email and password not null
   * 2. email is not already registered
   * 3. hash password
   * 4. create new user in db
   * 5. remove password and refreshToken field from response
   * 6. check if user is created successfully
   * 7. return response
   */

  const { email, password, role } = req.body;
  console.log(`email: ${email}\npassword: ${password}`);
  if ([email, password].some((field) => field?.trim() === ``)) {
    throw new ApiError(400, `All fields are required.`);
  }

  if (role !== `student` && role !== `educator`) {
    throw new ApiError(400, `Invalid Credentials`);
  }

  const existingUser = await Users.findOne({
    where: { email }
  });

  if (existingUser) {
    throw new ApiError(409, `User Already Exists!`);
  }

  const user = await Users.create({ email, password, role });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { email: user.email },
        `User registered successfully!`
      )
    );
});

const signInUser = asyncHandler(async (req, res) => {
/**
 * 1. req body -> data
 * 2. find the user
 * 3. password check
 * 4. access and refresh token generate
 * 5. send cookie
 */
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, `Email is Compulsory!`);
  }

  const existingUser = await Users.findOne({
    where: { email }
  });

  if (!existingUser) {
    throw new ApiError(404, `User Doesn't Exists!`);
  }

  const validUser = await existingUser.isPasswordCorrect(password);
  if (!validUser) {
    throw new ApiError(401, `Invalid User Credentials!`);
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(existingUser.id);

  const loggedInUser = {
    id: existingUser.id,
    email: existingUser.email
  };

  const options = {
    httpOnly: true,
    secure: true
  };

  return res
    .status(200)
    .cookie(`accessToken`, accessToken, options)
    .cookie(`refreshToken`, refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken
        },
        `User logged in successfully!`
      )
    );
});

const signOutUser = asyncHandler(async (req, res) => {
  const user = await Users.findByPk(req.user.id);
  user.refreshToken = null;
  await user.save({
    hooks: false
  });

  const options = {
    httpOnly: true,
    secure: true
  };

  return res
    .status(200)
    .clearCookie(`accessToken`, options)
    .clearCookie(`refreshToken`, options)
    .json(
      new ApiResponse(
        200,
        {},
        `User logged out successfully`
      )
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, `Unauthorized Request`);
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await Users.findByPk(decodedToken?.id);
    if (!user) {
      throw new ApiError(401, `Invalid Refresh Token`);
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, `Refresh token is expired or used`);
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user.id);

    const options = {
      httpOnly: true,
      secure: true
    };

    return res
      .status(200)
      .cookie(`accessToken`, accessToken, options)
      .cookie(`refreshToken`, refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken, refreshToken
          },
          `Access token refreshed`
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || `Invalid refresh token`);
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await Users.findByPk(req.user?.id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, `Invalid old password`);
  }

  user.password = newPassword;

  await user.save({
    validate: false
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, `Password changed successfully`));
});
module.exports = { signUpUser, signInUser, signOutUser, refreshAccessToken, changeCurrentPassword };
