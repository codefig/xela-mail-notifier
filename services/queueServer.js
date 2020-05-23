const RedisMQ = require("rsmq");
const dotenv = require("dotenv").config();
const rsmq = new RedisMQ({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  ns: process.env.REDIS_NS,
});
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
