const dotenv = require("dotenv").config();
const { sendNotification } = require("../helpers/utilities");
const { rsmq } = require("../config/redisConfig");

function receiveMessage() {
  setInterval(function () {
    rsmq.receiveMessage({ qname: process.env.QUEUE_NAME }, (err, resp) => {
      if (err) {
        console.log("Error : ");
        console.error(err);
        return;
      }
      if (resp.id) {
        const queueMessage = JSON.parse(resp.message);
        const { email, message } = queueMessage;
        sendNotification(email, message)
          .then((response) => {
            console.log("Email sent");
            rsmq.deleteMessage(
              { qname: process.env.QUEUE_NAME, id: resp.id },
              (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log("deleted message with id", resp.id);
              }
            );
          })
          .catch((err) => {
            console.log("error sending");
          });
      } else {
        console.log("no message in queue");
      }
    });
  }, 2000);
}

receiveMessage();
