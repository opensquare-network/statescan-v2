import io from "socket.io-client";
import {
  latestBlocksKey,
  latestBlocksRoom,
  latestSignedTransfersKey,
  latestSignedTransfersRoom,
} from "./consts";
import { getEnvEndpoint } from "../../utils/env";
import { store } from "../../store";
import {
  setLatestBlocks,
  setLatestSignedTransfers,
} from "../../store/reducers/socketSlice";

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
      store.dispatch(setLatestBlocks(data));
    });
    socket.on(latestSignedTransfersKey, (transferData) => {
      store.dispatch(setLatestSignedTransfers(transferData));
    });
  });
}

export function unSubscribeHomepageInfo() {
  if (socket) {
    socket.emit("unsubscribe", latestBlocksRoom);
    socket.emit("unsubscribe", latestSignedTransfersRoom);
  }
}
