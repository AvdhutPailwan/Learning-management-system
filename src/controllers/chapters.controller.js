const { Chapters } = require(`../../models`);

const createAChapter = async (req, res) => {
  const { courseId } = req.params;
  const { title } = req.body;
  try {
    const chapter = await Chapters.createAChapter(title, courseId);
    res.status(200).json(chapter);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const updateAChapter = async (req, res) => {
  const { chapterId } = req.params;
  const { title } = req.body;

  try {
    const updated = await Chapters.updateAChapter(title, chapterId);
    // console.log(updated[0]);
    return res.status(200).json({ message: ((updated[0] === 1) ? `success` : `fail`) });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const deleteAChapter = async (req, res) => {
  const { chapterId } = req.params;

  try {
    const deleted = await Chapters.deleteAChapter(chapterId);
    // console.log(deleted);
    return res.status(200).json({ message: ((deleted === 1) ? `success` : `fail`) });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

module.exports = { createAChapter, updateAChapter, deleteAChapter };
