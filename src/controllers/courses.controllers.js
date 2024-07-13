const { Courses, Enrollments, Chapters, Completeds, Pages } = require(`../../models`);
const { ApiError } = require(`../utils/ApiError`);
const { ApiResponse } = require(`../utils/ApiResponse`);
const { asyncHandler } = require(`../utils/asyncHandler`);


// ---------------------

async function chaptersOfTheCourse(courseId){
  try {
    const chapters = await Chapters.findAll({
      where: {
        courseId
      }
    });
    return chapters;
  } catch (error) {
    throw new ApiError(500, `error while calulating chapters`);
  }
}
async function pagesOfTheChapter(chapterId){
  try {
    const pages = await Pages.findAll({
      where: {
        chapterId
      }
    });
    return pages;
  } catch (error) {
    throw new ApiError(500, `error while calulating pages`);
  }
}

// --------------------
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
  const { id } = req.user;
  try {
    const courses = await Courses.findAll();
    let coursesEnrolledByUser = await Enrollments.findAll({
      where: {
        studentId: id
      }
    });

    let enrolledCourses = [];
    if(coursesEnrolledByUser.length > 0) {
      coursesEnrolledByUser = coursesEnrolledByUser.map(entry => entry.courseId);
      enrolledCourses = courses.filter(course => coursesEnrolledByUser.includes(course.id));
      
      let completed = await Completeds.findAll({
        where: {
          studentId: req.user.id
        },
        attributes:{
          exclude: ["id"]
        }
      });

      completed = completed.map(item => item.pageId);

      for (const element of enrolledCourses){
        // all chapters of the enrolled course
        const chapters = await chaptersOfTheCourse(element.id);
        let totalPages = 0;
        let completedPages = 0;

        for(let chapter of chapters){
          // all pages of the chapter
          const pages = await pagesOfTheChapter(chapter.id);
          
          totalPages += pages.length;
          const completedPagesOfTheChapter = pages.filter(page => completed.includes(page.id));
          completedPages += completedPagesOfTheChapter.length;
        }
        element["dataValues"]['progress'] = Math.round((completedPages/totalPages)*100);
      }
    }



    const availableCourses = courses.filter(course => !coursesEnrolledByUser.includes(course.id));

    res.status(200).json(
      new ApiResponse(
        200,
        { availableCourses, enrolledCourses }
      )
    );
  } catch (error) {
    
    throw new ApiError(500, `Something went wrong while fetching the courses`);
  }
});

const getCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  try {
    const chapters = await chaptersOfTheCourse(courseId);
    const enrollementStatus = await Enrollments.findAll({
      where: {
        courseId,
        studentId : req.user.id
      }
    });
    const isEnrolled = (enrollementStatus.length > 0);
    if(isEnrolled){
      let completed = await Completeds.findAll({
        where: {
          studentId: req.user.id
        },
        attributes:{
          exclude: ["id"]
        }
      });

      completed = completed.map(item => item.pageId);
      for(let chapter of chapters){
        const pages = await pagesOfTheChapter(chapter.id);
        const completedPages = await pages.filter(page => completed.includes(page.id));
        chapter[`dataValues`][`progress`] = Math.round((completedPages.length/pages.length) * 100);
      }
    }
    const course = await Courses.findByPk(courseId);

    return res.status(200)
      .json(
        new ApiResponse(
          200,
          {
            course,
            isEnrolled,
            chapters
          },
          `course details retrived successfully!`
        )
      );

  } catch (error) {
    
    throw new ApiError(500, "failed to retirve the course");
  }
})
module.exports = { createACourse, updateACourse, deleteACourse, viewAvailableAndEnrolledCourses, getCourse };

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
