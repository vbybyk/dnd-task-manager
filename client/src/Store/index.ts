import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export const configureStore = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(thunk)));
};

const store = configureStore();

export default store;
