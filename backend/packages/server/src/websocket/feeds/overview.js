const { getOverview } = require("../../jobs/overview");
let lastEmitted = null;
const util = require("util");
const { overviewRoom, overviewKey, feedInterval } = require("../consts");

function feedOverview(io) {
  try {
    const overview = getOverview();
    if (util.isDeepStrictEqual(overview, lastEmitted)) {
      return;
    }

    io.to(overviewRoom).emit(overviewKey, overview);
  } finally {
    setTimeout(feedOverview.bind(null, io), feedInterval);
  }
}

module.exports = {
  feedOverview,
};
