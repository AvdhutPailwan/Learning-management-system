const { where } = require("sequelize");
const { Pages, Chapters, Courses, Enrollments, Completeds } = require(`../../models`);
const { ApiError } = require(`../utils/ApiError`);
const { ApiResponse } = require(`../utils/ApiResponse`);
const { asyncHandler } = require(`../utils/asyncHandler`);

const createAPage = asyncHandler(async (req, res) => {
  const { title, content, chapterId } = req.body;
  try {
    const page = await Pages.createAPage(title, content, chapterId);
    return res.status(200).json(new ApiResponse(
      200,
      page,
      `Page created successfully`
    ));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, `Error occured during creation of Page!`);
  }
});

const updateAPage = asyncHandler(async (req, res) => {
  const { title, content, pageId } = req.body;

  try {
    const updated = await Pages.updateAPage(title, content, pageId); // updated = [1]
    return res.status(200).json(new ApiResponse(
      200,
      {},
      ((updated[0] === 1) ? `successfully updated the Page` : `failed to update the Page`)
    ));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, `Error occured during updation of page!`);
  }
});

const deleteAPage = asyncHandler(async (req, res) => {
  const { pageId } = req.body;

  try {
    const page = await Pages.findByPk(pageId);
    const chapter = await Chapters.findByPk(page.chapterId);
    const course = await Courses.findByPk(chapter.courseId);
    if (course.educatorId !== req.user.id) {
      throw new ApiError(401, `Unauthorized Request`);
    }

    const deleted = await Pages.deleteAPage(pageId); // deleted = 1
    return res.status(200).json(new ApiResponse(
      200,
      {},
      ((deleted === 1) ? `successfully deleted the page` : `failed to delete the page`)
    ));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, `Error occured during deletion of Page!`);
  }
});

const getAPage = asyncHandler(async (req,res) => {
  const { pageId } = req.params;
  try {

    const page = await Pages.findByPk(pageId);
    const chapter = await Chapters.findByPk(page.chapterId);
    const course = await Courses.findByPk(chapter.courseId);
    const enrollementStatus = await Enrollments.findAll({
      where: {
        courseId: course.id,
        studentId : req.user.id
      }
    });
    const isEnrolled = (enrollementStatus.length > 0);

    if(!isEnrolled && course.educatorId !== req.user.id) {
      throw new ApiError(401, `Unauthorized Request`);
    }

    let completed = await Completeds.findAll({
      where: {
        studentId: req.user.id,
        pageId: page.id
      },
      attributes: {
        exclude: [`id`]
      }
    });

    completed = completed.map(item => item.pageId);
    page['dataValues']["completed"] = completed.includes(page.id);

    return res.status(200)
      .json(new ApiResponse(
        200,
        page,
      ));

  } catch (error) {
    throw new ApiError(500, `Error while fetching page`);
  }
})

module.exports = { createAPage, updateAPage, deleteAPage, getAPage };
