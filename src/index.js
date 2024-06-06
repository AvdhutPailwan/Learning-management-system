require(`dotenv`).config();
const app = require(`./app.js`);
const { PORT } = require(`./constants.js`);

app.listen(PORT, () => {
  console.log(`server successfully started at ${PORT}\nFollow link: http://localhost:${PORT}`);
});
