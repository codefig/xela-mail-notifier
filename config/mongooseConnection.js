const mongoose = require("mongoose");
const consoleConfig = require("./chalkConfig");
const dotenv = require("dotenv").config();

// Database URL from config file replace with your mongoURI
const dbURL = process.env.DB_URI;

//export this function and imported by index.js
module.exports = function () {
  mongoose.connect(dbURL, { useNewUrlParser: true });

  mongoose.connection.on("connected", function () {
    console.log(
      consoleConfig.connected("Mongoose default connection is open to ", dbURL)
    );
  });

  mongoose.connection.on("error", function (err) {
    console.log(
      consoleConfig.error(
        "Mongoose default connection has occured " + err + " error"
      )
    );
  });

  mongoose.connection.on("disconnected", function () {
    console.log(
      consoleConfig.disconnected("Mongoose default connection is disconnected")
    );
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        consoleConfig.termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      );
      process.exit(0);
    });
  });
};
