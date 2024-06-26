const { Courses, Enrollments } = require(`../../models`);
const { ApiError } = require(`../utils/ApiError`);
const { ApiResponse } = require(`../utils/ApiResponse`);
const { asyncHandler } = require(`../utils/asyncHandler`);

const createACourse = asyncHandler(async (req, res) => {
  const educatorId = req.user.id;
  const { title, description } = req.body;

  try {
    const course = await Courses.createACourse(title, description, educatorId);
    res.status(200).json(new ApiResponse(
      200,
      course,
      `Course created successfully`
    ));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, `Error occured during creation of course!`);
  }
});

const updateACourse = asyncHandler(async (req, res) => {
  const { title, description, courseId } = req.body;

  try {
    const course = await Courses.findByPk(courseId);

    if (course.educatorId !== req.user.id) {
      throw new ApiError(401, `Unauthorized Request`);
    }

    const updated = await Courses.updateACourse(title, description, courseId);
    return res.status(200).json(new ApiResponse(
      200,
      {},
      ((updated[0] === 1) ? `successfully updated the course` : `failed to update the course`)
    ));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, `Error occured during updation of course!`);
  }
});

const deleteACourse = asyncHandler(async (req, res) => {
  const { courseId } = req.body;

  try {
    const course = await Courses.findByPk(courseId);
    if (course.educatorId !== req.user.id) {
      throw new ApiError(401, `Unauthorized Request`);
    }

    const deleted = await Courses.deleteACourse(courseId);
    return res.status(200).json(new ApiResponse(
      200,
      {},
      ((deleted === 1) ? `successfully deleted the course` : `failed to delete the course`)
    ));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, `Error occured during deletion of course!`);
  }
});

const viewAvailableAndEnrolledCourses = asyncHandler(async (req, res) => {
  /**
   * 1. get all the courses and get course id of enrolled from Enrollments
   * 2. map them and make available and enrolled category
   * 3. now for each each enrolled course
   *  1. find chaters
   *    1. for each chapter find pages
   *    2. find the same page id in completed
   *    3. filter the completed pages
   *    4. take the count and calculate the percentage of progress
   */
  const { id, role } = req.user;
  try {
    const courses = await Courses.findAll();
    const coursesEnrolledByUser = await Enrollments.findAll({
      where: {
        studentId: id
      }
    }).map(entry => entry.studentId);

    const enrolledCourses = courses.filter(course => coursesEnrolledByUser.includes(course.courseId));
    const availableCourses = courses.filter(course => !coursesEnrolledByUser.includes(course.courseId));

    res.status(200).json(
      new ApiResponse(
        200,
        { courses, coursesEnrolledByUser }
      )
    );
  } catch (error) {
    throw new ApiError(500, `Something went wrong while fetching the courses`);
  }
});

const getCourseDetails = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Courses.findByPk(courseId);
    const enrolled = await Enrollments.findOne({
      where: {
        studentId: req.user.id,
        courseId
      }
    });

    const isEnrolled = !!(enrolled);
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { course, isEnrolled },
          `course retrived successfully!`
        )
      );
  } catch (error) {

  }
});
module.exports = { createACourse, updateACourse, deleteACourse };

/*
------- response of findAll() -----------
[
  Users {
    dataValues: {
      id: 4,
      email: 'john.doe@example.com',
      password: 'hashed_password1',
      role: 'student',
      createdAt: null,
      updatedAt: null
    },
    _previousDataValues: {
      id: 4,
      email: 'john.doe@example.com',
      password: 'hashed_password1',
      role: 'student',
      createdAt: null,
      updatedAt: null
    },
    uniqno: 1,
    _changed: Set(0) {},
    _options: {
      isNewRecord: false,
      _schema: null,
      _schemaDelimiter: '',
      raw: true,
      attributes: [Array]
    },
    isNewRecord: false
  },
  Users {
    dataValues: {
      id: 5,
      email: 'jane.smith@example.com',
      password: 'hashed_password2',
      role: 'instructor',
      createdAt: null,
      updatedAt: null
    },
    _previousDataValues: {
      id: 5,
      email: 'jane.smith@example.com',
      password: 'hashed_password2',
      role: 'instructor',
      createdAt: null,
      updatedAt: null
    },
    uniqno: 1,
    _changed: Set(0) {},
    _options: {
      isNewRecord: false,
      _schema: null,
      _schemaDelimiter: '',
      raw: true,
      attributes: [Array]
    },
    isNewRecord: false
  },
  Users {
    dataValues: {
      id: 6,
      email: 'test.user@example.com',
      password: 'hashed_password3',
      role: 'admin',
      createdAt: null,
      updatedAt: null
    },
    _previousDataValues: {
      id: 6,
      email: 'test.user@example.com',
      password: 'hashed_password3',
      role: 'admin',
      createdAt: null,
      updatedAt: null
    },
    uniqno: 1,
    _changed: Set(0) {},
    _options: {
      isNewRecord: false,
      _schema: null,
      _schemaDelimiter: '',
      raw: true,
      attributes: [Array]
    },
    isNewRecord: false
  }
]
*/
