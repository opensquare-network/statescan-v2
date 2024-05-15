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
  setLatestBlocksLoading,
  setLatestSignedTransfersLoading,
} from "../../store/reducers/socketSlice";

let socket = null;
let blocksLastUpdate = 0;
let transfersLastUpdate = 0;
let overviewLastUpdate = 0;

export function connect() {
  if (socket) {
    socket.emit("unsubscribe", latestBlocksRoom);
    socket.emit("unsubscribe", latestSignedTransfersRoom);
    socket.emit("unsubscribe", overviewRoom);
    disconnect();
  }

  socket = io(new URL("/", getEnvEndpoint()).href);
  socket.connect();
  store.dispatch(setLatestBlocksLoading(true));
  store.dispatch(setLatestSignedTransfersLoading(true));

  socket.on("connect", () => {
    socket.emit("subscribe", latestBlocksRoom);
    socket.emit("subscribe", latestSignedTransfersRoom);
    socket.emit("subscribe", overviewRoom);

    socket.on(latestBlocksKey, (data) => {
      const now = new Date().getTime();
      if (now - blocksLastUpdate > 3000) {
        store.dispatch(setLatestBlocks(data));
        store.dispatch(setLatestBlocksLoading(false));
        blocksLastUpdate = now;
      }
    });
    socket.on(latestSignedTransfersKey, (transferData) => {
      const now = new Date().getTime();
      if (now - transfersLastUpdate > 3000) {
        store.dispatch(setLatestSignedTransfers(transferData));
        store.dispatch(setLatestSignedTransfersLoading(false));
        transfersLastUpdate = now;
      }
    });
    socket.on(overviewKey, (overviewData) => {
      const now = new Date().getTime();
      if (now - overviewLastUpdate > 3000) {
        store.dispatch(setOverview(overviewData));
        overviewLastUpdate = now;
      }
    });
  });
}

export function disconnect() {
  if (socket) {
    socket.disconnect();
  }
}

export function unSubscribeHomepageInfo() {
  if (socket) {
    socket.emit("unsubscribe", latestBlocksRoom);
    socket.emit("unsubscribe", latestSignedTransfersRoom);
    socket.emit("unsubscribe", overviewRoom);
  }
}
