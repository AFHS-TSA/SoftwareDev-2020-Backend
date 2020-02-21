const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routers/user");
const mongoDB = require("./config/mongoConnect");
const logger = require('./utils/logger');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working"  });
});

app.use("/user", user);

app.listen(PORT, (req, res) => {
  logger.info(`Server Started at PORT ${PORT}`);
});

module.exports = app;
