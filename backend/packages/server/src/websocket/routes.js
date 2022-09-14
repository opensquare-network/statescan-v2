const { latestBlocksRoom, latestBlocksKey } = require("./consts");
const { feedLatestBlocks } = require("./feeds/latestBlocks");
const { getLatestBlocks } = require("./store");

async function setSocketSubscriptions(io, socket) {
  socket.on("subscribe", (room) => {
    socket.join(room);

    if (latestBlocksRoom === room) {
      const latestBlocks = getLatestBlocks();
      io.to(room).emit(latestBlocksKey, latestBlocks);
    }
  });

  socket.on("unsubscribe", (room) => {
    socket.leave(room);
  });

  await feedLatestBlocks(io);
}

module.exports = {
  setSocketSubscriptions,
}
