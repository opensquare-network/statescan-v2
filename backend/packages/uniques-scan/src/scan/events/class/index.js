const { handleForceCreated } = require("./forceCreated");
const { handleCreated } = require("./created");

async function handleClassEvent(event, indexer, extrinsic, events) {
  const { section, method } = event;
  if ("uniques" !== section) {
    return;
  }

  if ("Created" === method) {
    await handleCreated(event, indexer);
  } else if ("ForceCreated" === method) {
    await handleForceCreated(event, indexer);
  }
}

module.exports = {
  handleClassEvent,
};
