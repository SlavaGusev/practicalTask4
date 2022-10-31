const path = require("path");
const timeouts = require(`${path.join(
  process.cwd(),
  "project",
  "configs",
  "timeouts.js"
)}`);

module.exports = timeouts;
