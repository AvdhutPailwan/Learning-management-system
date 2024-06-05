import dotenv from "dotenv";
import app from "./app.js";
import { PORT } from "./constants.js";
dotenv.config({
  path: `../.env`
});

app.listen(PORT, () => {
  console.log(`server successfully started at ${PORT}\nFollow link: http://localhost:${PORT}`);
});
