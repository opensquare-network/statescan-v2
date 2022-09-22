import { combineReducers } from "@reduxjs/toolkit";

import modeReducer from "./modeSlice";
import mobileMenuReducer from "./mobileMenuSlice";

export default combineReducers({
  mode: modeReducer,
  mobileMenu: mobileMenuReducer,
});
