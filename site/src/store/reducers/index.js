import { combineReducers } from "@reduxjs/toolkit";

import settingReducer from "./settingSlice";
import mobileMenuReducer from "./mobileMenuSlice";
import preferenceReducer from "./preferenceSlice";

export default combineReducers({
  setting: settingReducer,
  mobileMenu: mobileMenuReducer,
  preference: preferenceReducer,
});
