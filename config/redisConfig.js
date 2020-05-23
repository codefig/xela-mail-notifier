const client = require("redis").createClient(process.env.REDIS_URL);
const RedisMQ = require("rsmq");
const uri = require("url");
const parsed = uri.parse(process.env.REDIS_URL);
if (process.env.NODE_ENV == "production") {
  module.exports.rsmq = new RedisMQ({ client: client });
} else {
  module.exports.rsmq = new RedisMQ({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ns: process.env.REDIS_NS,
  });
}
