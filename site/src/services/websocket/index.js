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
    store.dispatch(setLatestBlocksLoading(true));
    socket.emit("subscribe", latestSignedTransfersRoom);
    store.dispatch(setLatestSignedTransfersLoading(true));
    socket.emit("subscribe", overviewRoom);

    socket.on(latestBlocksKey, (data) => {
      store.dispatch(setLatestBlocks(data));
      store.dispatch(setLatestBlocksLoading(false));
    });
    socket.on(latestSignedTransfersKey, (transferData) => {
      store.dispatch(setLatestSignedTransfers(transferData));
      store.dispatch(setLatestSignedTransfersLoading(false));
    });
    socket.on(overviewKey, (overviewData) => {
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
