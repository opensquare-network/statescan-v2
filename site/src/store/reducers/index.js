import { combineReducers } from "@reduxjs/toolkit";

import modeReducer from "./modeSlice";

export default combineReducers({
  mode: modeReducer,
});
