import { combineReducers } from "redux";
import { project } from "./project";
import { alert } from "./alert";
import { containers } from "./containers";
import { tasks } from "./tasks";

export interface IState {
  project: ReturnType<typeof project>;
  alert: ReturnType<typeof alert>;
  containers: ReturnType<typeof containers>;
  tasks: ReturnType<typeof tasks>;
}

const rootReducer = combineReducers({
  project,
  alert,
  containers,
  tasks,
});

export default rootReducer;
