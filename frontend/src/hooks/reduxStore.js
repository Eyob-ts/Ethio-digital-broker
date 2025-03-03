import { createStore, combineReducers } from "redux";
import listingReducer from "../redux/listingSlice";
import uiReducer from "../redux/uiSlice";
import authReducer from "../redux/authSlice";
import themeReducer from "../redux/themeSlice";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  listing: listingReducer,
  ui: uiReducer,
  theme: themeReducer
});

// Create store with the combined reducer
const store = createStore(rootReducer);

export default store;