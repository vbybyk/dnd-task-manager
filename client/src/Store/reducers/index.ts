import { combineReducers } from "redux";
import { project } from "./project";
import { alert } from "./alert";
import { containers } from "./containers";
import { tasks } from "./tasks";
import { labels } from "./labels";
import { users } from "./users";

export interface IState {
  project: ReturnType<typeof project>;
  alert: ReturnType<typeof alert>;
  containers: ReturnType<typeof containers>;
  tasks: ReturnType<typeof tasks>;
  labels: ReturnType<typeof labels>;
  users: ReturnType<typeof users>;
}

const rootReducer = combineReducers({
  project,
  alert,
  containers,
  tasks,
  labels,
  users,
});

export default rootReducer;
