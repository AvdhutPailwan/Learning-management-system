const { asyncHandler } = require("../utils/asyncHandler");
const { Completeds } = require("../../models");
const { ApiError } = require(`../utils/ApiError`);
const { ApiResponse } = require(`../utils/ApiResponse`);
const markAsCompleted = asyncHandler(async (req, res) => {
  const { pageId } = req.params;
  const studentId = req.user.id;
  try {
    const markAsCompleted = await Completeds.markAsCompleted(studentId, pageId);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          markAsCompleted,
          "successfully marked as completed!"
        )
      );
  } catch (error) {
    console.error(error)
    throw new ApiError(500, "Couldn't mark the page as completed");
  }
});

module.exports = { markAsCompleted };