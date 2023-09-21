const { feedOverview } = require("./feeds/overview");
const { getOverview } = require("../jobs/overview");
const { feedLatestSignedTransfers } = require("./feeds/latestSignedTransfers");
const {
  latestBlocksRoom,
  latestBlocksKey,
  firstPageBlocksRoom,
  overviewRoom,
  overviewKey,
  firstPageBlocksKey,
  latestSignedTransfersRoom,
  latestSignedTransfersKey,
} = require("./consts");
const { feedLatestBlocks } = require("./feeds/latestBlocks");
const { feedFirstPageBlocks } = require("./feeds/firstPageBlocks");
const {
  getLatestBlocks,
  getFirstPageBlocks,
  getLatestSignedTransfers,
} = require("./store");

async function setSocketSubscriptions(io, socket) {
  socket.on("subscribe", (room) => {
    socket.join(room);

    if (latestBlocksRoom === room) {
      const latestBlocks = getLatestBlocks();
      socket.emit(latestBlocksKey, latestBlocks);
    } else if (firstPageBlocksRoom === room) {
      const firstPageBlocks = getFirstPageBlocks();
      socket.emit(firstPageBlocksKey, firstPageBlocks);
    } else if (latestSignedTransfersRoom === room) {
      const transfers = getLatestSignedTransfers();
      socket.emit(latestSignedTransfersKey, transfers);
    } else if (overviewRoom === room) {
      socket.emit(overviewKey, getOverview());
    }
  });

  socket.on("unsubscribe", (room) => {
    socket.leave(room);
  });

  await feedLatestBlocks(io);
  await feedFirstPageBlocks(io);
  await feedLatestSignedTransfers(io);
  feedOverview(io);
}

module.exports = {
  setSocketSubscriptions,
};
