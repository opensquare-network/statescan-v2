const { feedOverview } = require("./feeds/overview");
const { getOverview } = require("../jobs/overview");
const { feedLatestSignedTransfers } = require("./feeds/latestSignedTransfers");
const { feedPopularNftClasses } = require("./feeds/popularNftClasses");
const { feedLatestBlocks } = require("./feeds/latestBlocks");
const { feedFirstPageBlocks } = require("./feeds/firstPageBlocks");
const {
  overviewRoom,
  overviewKey,
  latestBlocksRoom,
  latestBlocksKey,
  firstPageBlocksRoom,
  firstPageBlocksKey,
  latestSignedTransfersRoom,
  latestSignedTransfersKey,
  popularNftClassesRoom,
  popularNftClassesKey,
} = require("./consts");
const {
  getLatestBlocks,
  getFirstPageBlocks,
  getLatestSignedTransfers,
  getPopularNftClasses,
} = require("./store");

async function setSocketSubscriptions(io, socket) {
  socket.on("subscribe", (room) => {
    socket.join(room);

    if (latestBlocksRoom === room) {
      const latestBlocks = getLatestBlocks();
      io.to(room).emit(latestBlocksKey, latestBlocks);
    } else if (firstPageBlocksRoom === room) {
      const firstPageBlocks = getFirstPageBlocks();
      io.to(room).emit(firstPageBlocksKey, firstPageBlocks);
    } else if (latestSignedTransfersRoom === room) {
      const transfers = getLatestSignedTransfers();
      io.to(room).emit(latestSignedTransfersKey, transfers);
    } else if (popularNftClassesRoom === room) {
      const nftClasses = getPopularNftClasses();
      io.to(room).emit(popularNftClassesKey, nftClasses);
    } else if (overviewRoom === room) {
      io.to(room).emit(overviewKey, getOverview());
    }
  });

  socket.on("unsubscribe", (room) => {
    socket.leave(room);
  });

  await feedLatestBlocks(io);
  await feedFirstPageBlocks(io);
  await feedLatestSignedTransfers(io);
  await feedPopularNftClasses(io);
  feedOverview(io);
}

module.exports = {
  setSocketSubscriptions,
};
