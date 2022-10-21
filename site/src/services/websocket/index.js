import io from "socket.io-client";
import {
  latestBlocksKey,
  latestBlocksRoom,
  latestSignedTransfersKey,
  latestSignedTransfersRoom,
  overviewKey,
  overviewRoom,
} from "./consts";
import { getEnvEndpoint } from "../../utils/env";
import { store } from "../../store";
import {
  setLatestBlocks,
  setLatestSignedTransfers,
  setOverview,
} from "../../store/reducers/socketSlice";

let socket = null;

export function connect() {
  if (socket) {
    socket.emit("unsubscribe", latestBlocksRoom);
    socket.emit("unsubscribe", latestSignedTransfersRoom);
    socket.emit("unsubscribe", overviewRoom);
    socket.disconnect();
  }

  socket = io(new URL(`/`, getEnvEndpoint()).href);
  socket.connect();

  socket.on("connect", () => {
    socket.emit("subscribe", latestBlocksRoom);
    socket.emit("subscribe", latestSignedTransfersRoom);
    socket.emit("subscribe", overviewRoom);

    socket.on(latestBlocksKey, (data) => {
      store.dispatch(setLatestBlocks(data));
    });
    socket.on(latestSignedTransfersKey, (transferData) => {
      store.dispatch(setLatestSignedTransfers(transferData));
    });
    socket.on(overviewKey, (overviewData) => {
      console.log(overviewRoom, overviewKey, overviewData);
      store.dispatch(setOverview(overviewData));
    });
  });
}

export function unSubscribeHomepageInfo() {
  if (socket) {
    socket.emit("unsubscribe", latestBlocksRoom);
    socket.emit("unsubscribe", latestSignedTransfersRoom);
    socket.emit("unsubscribe", overviewRoom);
  }
}
