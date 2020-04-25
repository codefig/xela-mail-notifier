const redis = require("redis");

const publisher = redis.createClient();

function publishMessage(message) {
  publisher.publish("notification", message, function () {
    console.log("A new message has been published ");
    // process.exit(0);
  });
}

module.exports = publishMessage;
// publishMessage("The new town");
