import { combineReducers } from "@reduxjs/toolkit";

import settingReducer from "./settingSlice";
import mobileMenuReducer from "./mobileMenuSlice";
import preferenceReducer from "./preferenceSlice";
import socketReducer from "./socketSlice";
import tooltipReducer from "./tooltipSlice";
import httpErrorReducer from "./httpErrorSlice";
import extrinsicReducer from "./extrinsicSlice";
import blockReducer from "./blockSlice";
import detailTablesReducer from "./detailTablesSlice";
import filterReducer from "./filterSlice";

export default combineReducers({
  setting: settingReducer,
  mobileMenu: mobileMenuReducer,
  preference: preferenceReducer,
  socket: socketReducer,
  tooltip: tooltipReducer,
  httpError: httpErrorReducer,
  extrinsic: extrinsicReducer,
  block: blockReducer,
  detailTables: detailTablesReducer,
  filter: filterReducer,
});
