const validator = require("validator");

module.exports.isAlphaNumericSpaced = function (input) {
  const valid = input.split(" ").every(function (str) {
    return validator.isAlphanumeric(str);
  });
  return valid;
};

module.exports.isAlphaSpaced = function (input) {
  const valid = input.split(" ").every(function (str) {
    return validator.isAlpha(str);
  });
  return valid;
};
