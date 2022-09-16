import { combineReducers } from "@reduxjs/toolkit";

import chainReducer from "./chainSlice";
import modeReducer from "./modeSlice";
import mobileMenuReducer from "./mobileMenuSlice";
import preferenceReducer from "./preferenceSlice";

export default combineReducers({
  chain: chainReducer,
  mode: modeReducer,
  mobileMenu: mobileMenuReducer,
  preference: preferenceReducer,
});
