import { combineReducers } from "@reduxjs/toolkit";

import modeReducer from "./modeSlice";
import mobileMenuReducer from "./mobileMenuSlice";
import preferenceReducer from "./preferenceSlice";

export default combineReducers({
  mode: modeReducer,
  mobileMenu: mobileMenuReducer,
  preference: preferenceReducer,
});
