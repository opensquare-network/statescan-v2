import io from "socket.io-client";
import { store } from "../store";
import { setOverview, setScanHeight } from "../store/reducers/chainSlice";

const latestBlocksRoom = "LATEST_BLOCKS";
const firstPageBlocksRoom = "FIRST_PAGE_BLOCKS";
const latestSignedTransfers = "LATEST_SIGNED_TRANSFERS";

export let socket = null;

export function connect() {
  if (socket) {
    // socket.emit("unsubscribe", chainStatusRoom);
    // socket.emit("unsubscribe", overviewRoom);
    socket.disconnect();
  }

  socket = io(new URL(`/`, process.env.REACT_APP_PUBLIC_API_END_POINT).href);
  socket.connect();

  socket.on("connect", () => {
    socket.emit("subscribe", latestBlocksRoom);
    socket.emit("subscribe", firstPageBlocksRoom);
    socket.emit("subscribe", latestSignedTransfers);

    // socket.on("scanStatus", ({ height }) => {
    //   store.dispatch(setScanHeight(height));
    // });
    // socket.on("overview", (overview) => {
    //   console.log(overview,111)
    //   store.dispatch(setOverview(overview));
    // });
    // socket.on("LATEST_BLOCKS", (overview) => {
    //   console.log(overview,111)
    //   // store.dispatch(setOverview(overview));
    // });
  });
}
