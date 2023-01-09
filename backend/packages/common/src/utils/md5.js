const crypto = require("crypto");

// calculate md5 hash of the input data
function md5(data) {
  return crypto.createHash("md5").update(data).digest("hex");
}

module.exports = {
  md5,
};
