import { combineReducers } from "redux";
import { project } from "./project";
import { alert } from "./alert";
import { containers } from "./containers";
import { tasks } from "./tasks";
import { labels } from "./labels";

export interface IState {
  project: ReturnType<typeof project>;
  alert: ReturnType<typeof alert>;
  containers: ReturnType<typeof containers>;
  tasks: ReturnType<typeof tasks>;
  labels: ReturnType<typeof labels>;
}

const rootReducer = combineReducers({
  project,
  alert,
  containers,
  tasks,
  labels,
});

export default rootReducer;
