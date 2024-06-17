const { Chapters, Courses } = require(`../../models`);
const { ApiError } = require(`../utils/ApiError`);
const { ApiResponse } = require(`../utils/ApiResponse`);

const createAChapter = async (req, res) => {
  const { title, courseId } = req.body;
  try {
    const chapter = await Chapters.createAChapter(title, courseId);
    return res.status(200).json(new ApiResponse(
      200,
      chapter,
      `Chapter created successfully`
    ));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, `Error occured during Creation of Chapter!`);
  }
};

const updateAChapter = async (req, res) => {
  const { title, chapterId } = req.body;

  try {
    const updated = await Chapters.updateAChapter(title, chapterId);
    return res.status(200).json(new ApiResponse(
      200,
      {},
      ((updated[0] === 1) ? `successfully updated the chapter` : `failed to update the chapter`)
    ));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, `Error occured during updation of Chapter!`);
  }
};

const deleteAChapter = async (req, res) => {
  const { chapterId } = req.body;

  try {
    const chapter = await Chapters.findByPk(chapterId);
    const course = await Courses.findByPk(chapter.courseId);
    if (course.educatorId !== req.user.id) {
      throw new ApiError(401, `Unauthorized Request`);
    }

    const deleted = await Chapters.deleteAChapter(chapterId);
    return res.status(200).json(new ApiResponse(
      200,
      {},
      ((deleted === 1) ? `successfully deleted the Chapter` : `failed to delete the Chapter`)
    ));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, `Error occured during deletion of Chapter!`);
  }
};

module.exports = { createAChapter, updateAChapter, deleteAChapter };
