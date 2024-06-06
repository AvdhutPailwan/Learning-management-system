const { Enrollments } = require(`../../models`);
const getAllCourses = async (req, res) => {
  console.log(`Hello`);
  const { studentId } = req.params;
  const result = await Enrollments.findAll();
  console.log(result);
  return res.json({ message: `hi` });
};

module.exports = { getAllCourses };
