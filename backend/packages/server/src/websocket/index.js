const { setSocketSubscriptions } = require("./routes");
const { Server } = require("socket.io");

/**
 *
 * @param server http server
 * @returns {Promise<void>}
 */
async function setupSocketAndEmit(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async socket => {
    await setSocketSubscriptions(io, socket);
  })
}

module.exports = {
  setupSocketAndEmit,
}
