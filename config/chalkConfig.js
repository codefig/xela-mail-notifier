const chalk = require("chalk");

let consoleConfig = {};
consoleConfig.success = chalk.bold.green;
consoleConfig.connected = chalk.bold.cyan;
consoleConfig.error = chalk.bold.yellow;
consoleConfig.disconnected = chalk.bold.red;
consoleConfig.termination = chalk.bold.magenta;

module.exports = consoleConfig;
