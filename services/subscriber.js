const redis = require("redis");
const subscriber = redis.createClient();

function subscribe() {
  console.log("Listener started");
  subscriber.on("message", function (channel, message) {
    console.log(`New Message :  Channel : ${channel}  -> ${message} `);
  });

  subscriber.subscribe("notification");
  console.log("Subscriber:  ", subscriber);
}

// module.exports.createListener = subscribe;
// subscribe();
