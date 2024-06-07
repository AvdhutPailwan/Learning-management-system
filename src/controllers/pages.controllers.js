const { Pages } = require(`../../models`);

const createAPage = async (req, res) => {
  const { chapterId } = req.params;
  const { title, content } = req.body;
  try {
    const page = await Pages.createAPage(title, content, chapterId);
    res.status(200).json(page);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const updateAPage = async (req, res) => {
  const { pageId } = req.params;
  const { title, content } = req.body;

  try {
    const updated = await Pages.updateAPage(title, content, pageId); // updated = [1]
    return res.status(200).json({ message: ((updated[0] === 1) ? `success` : `fail`) });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const deleteAPage = async (req, res) => {
  const { pageId } = req.params;

  try {
    const deleted = await Pages.deleteAPage(pageId); // deleted = 1
    return res.status(200).json({ message: ((deleted === 1) ? `success` : `fail`) });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

module.exports = { createAPage, updateAPage, deleteAPage };
