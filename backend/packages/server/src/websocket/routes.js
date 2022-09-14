const { latestBlocksRoom, latestBlocksKey, firstPageBlocksRoom, firstPageBlocksKey } = require("./consts");
const { feedLatestBlocks } = require("./feeds/latestBlocks");
const { feedFirstPageBlocks } = require("./feeds/firstPageBlocks");
const { getLatestBlocks, getFirstPageBlocks } = require("./store");

async function setSocketSubscriptions(io, socket) {
  socket.on("subscribe", (room) => {
    socket.join(room);

    if (latestBlocksRoom === room) {
      const latestBlocks = getLatestBlocks();
      io.to(room).emit(latestBlocksKey, latestBlocks);
    } else if (firstPageBlocksRoom === room) {
      const firstPageBlocks = getFirstPageBlocks();
      io.to(room).emit(firstPageBlocksKey, firstPageBlocks);
    }
  });

  socket.on("unsubscribe", (room) => {
    socket.leave(room);
  });

  await feedLatestBlocks(io);
  await feedFirstPageBlocks(io);
}

module.exports = {
  setSocketSubscriptions,
}
