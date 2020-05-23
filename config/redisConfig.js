const RedisMQ = require("rsmq");
const uri = require("url");
const parsed = uri.parse(process.env.REDIS_URL);
if (process.env.NODE_ENV == "production") {
  module.exports.rsmq = new RedisMQ({
    host: parsed.hostname,
    port: parsed.port,
    ns: "ns",
  });
} else {
  module.exports.rsmq = new RedisMQ({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ns: process.env.REDIS_NS,
  });
}
