const { Courses } = require(`../../models`);

const createACourse = async (req, res) => {
  const { educatorId } = req.params;
  const { title, description } = req.body;

  // Todo: put client side validation so that description variable always comes
  try {
    const course = await Courses.createACourse(title, description, educatorId);
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const updateACourse = async (req, res) => {
  const { courseId } = req.params;
  const { title, description } = req.body;

  try {
    const updated = await Courses.updateACourse(title, description, courseId);
    // console.log(updated[0]);
    return res.status(200).json({ message: ((updated[0] === 1) ? `success` : `fail`) });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const deleteACourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const deleted = await Courses.deleteACourse(courseId);
    // console.log(deleted);
    return res.status(200).json({ message: ((deleted === 1) ? `success` : `fail`) });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

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
