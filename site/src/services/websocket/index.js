import io from "socket.io-client";
import {
  latestBlocksKey,
  latestBlocksRoom,
  latestSignedTransfersKey,
  latestSignedTransfersRoom,
} from "./consts";
import { getEnvEndpoint } from "../../utils/env";

let socket = null;

export function connect() {
  if (socket) {
    socket.emit("unsubscribe", latestBlocksRoom);
    socket.emit("unsubscribe", latestSignedTransfersRoom);
    socket.disconnect();
  }

  socket = io(new URL(`/`, getEnvEndpoint()).href);
  socket.connect();

  socket.on("connect", () => {
    socket.emit("subscribe", latestBlocksRoom);
    socket.emit("subscribe", latestSignedTransfersRoom);

    socket.on(latestBlocksKey, (data) => {
      console.log("latestBlocksKey data", data);
    });
    socket.on(latestSignedTransfersKey, (transferData) => {
      console.log("transferData", transferData);
    });
  });
}
