const express = require(`express`);
const cookieParser = require(`cookie-parser`);
const helmet = require(`helmet`);

/**
 * Todo: add a csrf security
 */

// router import
const userRouter = require(`./routes/users.routes`);
const coursesRouter = require(`./routes/courses.routes`);
const chaptersRouter = require(`./routes/chapters.routes`);
const pageRouter = require(`./routes/pages.routes`);
const completedRouter = require(`./routes/completed.routes`);
const enrollmentRouter = require(`./routes/enrollments.routes`);
const { verifyJwt } = require(`./middlewares/auth.middleware`);

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get(`/`, (req, res) => {
  res.json({ message: `Hello User!!!` });
});

app.use(`/user`, userRouter);

app.use(verifyJwt);
app.use(`/course`, coursesRouter);
app.use(`/chapter`, chaptersRouter);
app.use(`/page`, pageRouter);
app.use(`/completed`, completedRouter);
app.use(`/enroll`, enrollmentRouter);

module.exports = app;
