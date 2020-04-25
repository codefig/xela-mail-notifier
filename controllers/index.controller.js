const validator = require("validator");
const { sendNotification } = require("../helpers/utilities");
const publishMessage = require("../services/publisher");
const Message = require("../models/message.model");

module.exports.messageMediator = async function (req, res) {
  try {
    let errors = {};
    if (!req.body.email || !validator.isEmail(req.body.email)) {
      errors["email"] = "A valid email is required";
    }
    if (!req.body.message) {
      errors["message"] = "A valid message is required";
    }
    if (Object.keys(errors).length != 0) {
      res.status(401).send({ message: "Validation failed ", errors: errors });
    }

    publishMessage({ email: req.body.email, message: req.body.message });
    let message = await new Message(req.body).save();
    await sendNotification(req.body.email, req.body.message);
    res
      .status(201)
      .send({ data: message, message: "Message successfully sent" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errors: "Unable to send message" });
  }
};
