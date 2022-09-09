// import io from "socket.io-client";
// import { store } from "../store";
// import { setOverview, setScanHeight } from "../store/reducers/chainSlice";
//
// const chainStatusRoom = "CHAIN_STATUS_ROOM";
// const overviewRoom = "OVERVIEW_ROOM";
// const firstPageBlocksRoom = "FIRST_PAGE_BLOCKS_ROOM";
//
// export let socket = null;
//
// export function connect() {
//   if (socket) {
//     socket.emit("unsubscribe", chainStatusRoom);
//     socket.emit("unsubscribe", overviewRoom);
//     socket.disconnect();
//   }
//
//   socket = io(new URL(`/`, process.env.NEXT_PUBLIC_API_END_POINT).href);
//   socket.connect();
//
//   socket.on("connect", () => {
//     socket.emit("subscribe", chainStatusRoom);
//     socket.emit("subscribe", overviewRoom);
//
//     socket.on("scanStatus", ({ height }) => {
//       store.dispatch(setScanHeight(height));
//     });
//     socket.on("overview", (overview) => {
//       store.dispatch(setOverview(overview));
//     });
//   });
// }
//
// export function listenFirstPageBlocks(chain, callback) {
//   if (socket) {
//     socket.emit("unsubscribe", firstPageBlocksRoom);
//     socket.disconnect();
//   }
//
//   socket = io(new URL(`/${chain}`, process.env.NEXT_PUBLIC_API_END_POINT).href);
//   socket.connect();
//
//   socket.on("connect", () => {
//     socket.emit("subscribe", firstPageBlocksRoom);
//
//     socket.on("firstPageBlocks", (firstPageBlocks) => {
//       callback(firstPageBlocks);
//     });
//   });
//
//   return () => {
//     if (socket) {
//       socket.emit("unsubscribe", firstPageBlocksRoom);
//       socket.disconnect();
//     }
//   };
// }
//
// export function unSubscribeFirstBlocks() {
//   if (socket) {
//     socket.emit("unsubscribe", firstPageBlocksRoom);
//     socket.disconnect();
//   }
// }
