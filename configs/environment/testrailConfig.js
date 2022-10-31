const path = require("path");
const testrailConfig = require(`${path.join(
  process.cwd(),
  "configs",
  "environment",
  "testrailConfig.js"
)}`);

module.exports = testrailConfig;
