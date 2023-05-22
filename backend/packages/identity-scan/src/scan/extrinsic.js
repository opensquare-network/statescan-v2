const { isExtrinsicSuccess } = require("@osn/scan-common/src/utils");

async function handleExtrinsics(extrinsics = [], events = [], blockIndexer) {
  for (const extrinsic of extrinsics) {
    //TODO: check if extrinsic is success with events
    if (!isExtrinsicSuccess(events)) {
      continue;
    }

    const {
      method: { method },
    } = extrinsic;
    if (method === "setSubs") {
      const extrinsicData = extrinsic.method.args[0]; // assuming the data you're interested in is the first argument
      console.log(`extrinsicData`, extrinsicData.toHuman());
    }
  }
}

module.exports = {
  handleExtrinsics,
};
