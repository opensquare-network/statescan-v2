const { isExtrinsicSuccess } = require("@osn/scan-common/src/utils");
const {
  handleSubIdentityExtrinsics,
} = require("./extrinsics/subIdentityExtrinsics");

async function handleExtrinsics(extrinsics = [], events = [], indexer) {
  for (const extrinsic of extrinsics) {
    //TODO: check if extrinsic is success with events
    if (!isExtrinsicSuccess(events)) {
      continue;
    }

    const {
      method: { method },
    } = extrinsic;
    if (method === "setSubs" || method === "renameSub") {
      await handleSubIdentityExtrinsics(extrinsic, indexer, method);
    }
  }
}

module.exports = {
  handleExtrinsics,
};
