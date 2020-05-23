const validator = require("validator");
const Message = require("../models/message.model");
const dotenv = require("dotenv").config();

const { rsmq } = require("../config/redisConfig");
// console.log(rsmq);
module.exports.messageHandler = async function (req, res) {
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
    let message = await new Message(req.body).save();
    rsmq.sendMessage(
      {
        qname: process.env.QUEUE_NAME,
        message: JSON.stringify({
          email: req.body.email,
          message: req.body.message,
        }),
        delay: 0,
      },
      (err) => {
        if (err) {
          console.error("Error : ", err);
          return;
        }
      }
    );
    console.log("pushed new message into queue");
    res
      .status(201)
      .send({ data: message, message: "Message successfully sent" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errors: "Unable to send message" });
  }
};
