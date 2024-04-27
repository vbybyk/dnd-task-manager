import { AnyAction } from "redux";
import { IProject, IContainer, ITask } from "../../Interfaces/tasks";

export interface IState {
  projects: IProject[];
  containers: IContainer[];
  tasks: ITask[];
  isFetching: boolean;
  isFetchingTasks: boolean;
  project?: IProject;
  isUpdateModalOpen: boolean;
}

const initialState: IState = {
  projects: [],
  containers: [],
  tasks: [],
  project: undefined,
  isFetching: false,
  isFetchingTasks: false,
  isUpdateModalOpen: false,
};

const reducer = (state = initialState, action: AnyAction): IState => {
  switch (action.type) {
    case "PROJECTS_REQUEST":
    case "PROJECT_REQUEST":
    case "TASKS_UPDATED_REQUEST":
      return { ...state, isFetching: true };
    case "PROJECTS_SUCCESS":
      return { ...state, isFetching: false, projects: action.payload };
    case "PROJECT_SUCCESS":
      return { ...state, isFetching: false, project: action.payload };
    case "TASK_UPDATED_SUCCESS":
      return { ...state, isFetching: false };
    case "PROJECTS_REQUEST_ERROR":
    case "PROJECT_REQUEST_ERROR":
    case "TASKS_UPDATED_ERROR":
    case "PROJECT_CONTAINERS_REQUEST_ERROR":
      return { ...state, isFetching: false };
    case "TOGGLE_UPDATE_TASK_MODAL":
      return { ...state, isUpdateModalOpen: !state.isUpdateModalOpen };
    case "PROJECT_TASKS_REQUEST":
      return { ...state, isFetchingTasks: true };
    case "PROJECT_TASKS_SUCCESS":
      return { ...state, isFetchingTasks: false, tasks: action.payload };
    case "PROJECT_TASKS_REQUEST_ERROR":
      return { ...state, isFetchingTasks: false };
    case "PROJECT_CONTAINERS_REQUEST":
      return { ...state, isFetching: true };
    case "PROJECT_CONTAINERS_SUCCESS":
      return { ...state, isFetching: false, containers: action.payload };
    case "SET_NEW_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    default:
      return state;
  }
};

export default reducer;
