const { asyncHandler } = require("../utils/asyncHandler");
const { Enrollments } = require("../../models");
const { ApiError } = require(`../utils/ApiError`);
const { ApiResponse } = require(`../utils/ApiResponse`);

const enrollInACourse = asyncHandler(async (req, res) => {
  const studentId = req.user.id;
  const { courseId } = req.params;

  try {
    const enroll = await Enrollments.enrollInACourse(studentId, courseId);
    return res
      .status(200)
      .json(new ApiResponse(
        200,
        enroll,
        "succcessfully enrolled in course"
      ))
  } catch (error) {
    throw new ApiError(500, `Error occured during enrolling in a course`);
  }
})

module.exports = { enrollInACourse };