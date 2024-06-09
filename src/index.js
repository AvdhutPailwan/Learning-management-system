require(`dotenv`).config();
const app = require(`./app`);
const { PORT } = require(`./constants`);

app.listen(PORT, () => {
  console.log(`server successfully started at ${PORT}\nFollow link: http://localhost:${PORT}`);
});
