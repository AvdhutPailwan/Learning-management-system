const express = require(`express`);

/**
 * Todo: sign in and sign up
 * Todo: store hashed passwords
 * Todo: add auth middleware to authenticate User
 * Todo: add a middleware to authorise the educator route to only educator
 * Todo: always verify the role of the user before doing any operation on educators routes
 * Todo: add a csrf security
 * Todo: Disable X-Powered-By header for your Express app[:20] (consider using Helmet middleware)
 */

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
