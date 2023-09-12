import { combineReducers } from "@reduxjs/toolkit";

import settingReducer from "./settingSlice";
import mobileMenuReducer from "./mobileMenuSlice";
import preferenceReducer from "./preferenceSlice";
import socketReducer from "./socketSlice";
import httpErrorReducer from "./httpErrorSlice";
import extrinsicReducer from "./extrinsicSlice";
import blockReducer from "./blockSlice";
import eventReducer from "./eventSlice";
import callReducer from "./callSlice";
import detailTablesReducer from "./detailTablesSlice";
import filterReducer from "./filterSlice";
import accountReducer from "./accountSlice";
import transferReducer from "./transferSlice";
import assetReducer from "./assetSlice";
import nftReducer from "./nftSlice";
import nftClassReducer from "./nftClassSlice";
import nftInstanceReducer from "./nftInstanceSlice";
import nodeReducer from "./nodeSlice";
import chainReducer from "./chainSlice";

export default combineReducers({
  setting: settingReducer,
  mobileMenu: mobileMenuReducer,
  preference: preferenceReducer,
  socket: socketReducer,
  httpError: httpErrorReducer,
  extrinsic: extrinsicReducer,
  block: blockReducer,
  event: eventReducer,
  call: callReducer,
  detailTables: detailTablesReducer,
  filter: filterReducer,
  account: accountReducer,
  transfer: transferReducer,
  asset: assetReducer,
  nft: nftReducer,
  nftClass: nftClassReducer,
  nftInstance: nftInstanceReducer,
  node: nodeReducer,
  chain: chainReducer,
});
