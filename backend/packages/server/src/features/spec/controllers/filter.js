// used for extrinsic/event filter
const { getSpecs } = require("../../../jobs/runtime");

function getSpecFilter(ctx) {
  ctx.body = getSpecs();
}

module.exports = {
  getSpecFilter,
};
