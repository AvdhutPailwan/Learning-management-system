const express = require(`express`);

// router import
const userRouter = require(`./routes/users.routes.js`);
const coursesRouter = require(`./routes/courses.routes.js`);
const chaptersRouter = require(`./routes/chapters.routes.js`);
const pageRouter = require(`./routes/pages.routes.js`);
const completedRouter = require(`./routes/completed.routes.js`);
const enrollmentRouter = require(`./routes/enrollments.routes.js`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`/`, (req, res) => {
  res.json({ message: `Hello User!!!` });
});

app.use(`/user`, userRouter);
app.use(`/course`, coursesRouter);
app.use(`/chapter`, chaptersRouter);
app.use(`/page`, pageRouter);
app.use(`/completed`, completedRouter);
app.use(`/enroll`, enrollmentRouter);

module.exports = app;
