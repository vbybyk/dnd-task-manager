import { combineReducers } from "redux";
import { project } from "./project";
import { alert } from "./alert";

export interface IState {
  project: ReturnType<typeof project>;
  alert: ReturnType<typeof alert>;
}

const rootReducer = combineReducers({
  project,
  alert,
});

export default rootReducer;
