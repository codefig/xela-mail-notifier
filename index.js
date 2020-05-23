const express = require("express");
const mongooseConnection = require("./config/mongooseConnection");
const { createQueue } = require("./services/queueServer");
const messageController = require("./controllers/index.controller");
const { sendNotification } = require("./helpers/utilities");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Xela Mail Notifier");
});

app.post("/messages", async (req, res) => {
  messageController.messageHandler(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  mongooseConnection();
  createQueue();
  console.log("Application started on port: ", PORT);
});
