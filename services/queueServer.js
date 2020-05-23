const { rsmq } = require("../config/redisConfig");

module.exports.createQueue = function () {
  rsmq.createQueue({ qname: process.env.QUEUE_NAME }, (err) => {
    console.log("Creating queue");
    if (err) {
      if (err.name !== "queueExists") {
        console.error(err);
        return;
      } else {
        console.log("The queue exists. That's OK.");
      }
    }
    console.log("queue created");
  });
};
