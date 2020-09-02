const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const startMongoServer = require("./config/db");

startMongoServer();

const app = express();

const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());

//API to test whether Application is up and running
app.get("/", (req, res) => {
  res.json({ message: "Success - App is up and running !!" });
});

app.use("/user", user);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

module.exports = app;