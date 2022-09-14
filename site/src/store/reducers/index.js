import { combineReducers } from "@reduxjs/toolkit";

import themeReducer from "./themeSlice";

export default combineReducers({
  theme: themeReducer,
});
