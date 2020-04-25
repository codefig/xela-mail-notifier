const express = require("express");

const mongooseConnection = require("./config/mongooseConnection");
// const { createListener } = require("./services/subscriber");
const messageController = require("./controllers/index.controller");
const publishMessage = require("./services/publisher");
const app = express();
const client = require("redis").createClient();
const { createListener } = require("./services/subscriber");
const publisher = require("redis").createClient();
app.use(express.json());

app.get("/", (req, res) => {
  publishMessage("Good man");
  res.send("Welcoem to Xela Mail Notifier");
});

app.post("/messages", async (req, res) => {
  messageController.messageMediator(req, res);
});

createListener();
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  mongooseConnection();
  console.log("Application started on port: ", PORT);
});
