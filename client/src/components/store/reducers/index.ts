import { AnyAction } from "redux";
import { IProject, ITask } from "../../Interfaces/tasks";

export interface IState {
  projects?: IProject[] | undefined;
  isFetching: boolean;
  project?: IProject;
  isUpdateModalOpen: boolean;
}

const initialState: IState = {
  projects: [],
  project: undefined,
  isFetching: false,
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
      return { ...state, isFetching: false };
    case "TOGGLE_UPDATE_TASK_MODAL":
      return { ...state, isUpdateModalOpen: !state.isUpdateModalOpen };
    default:
      return state;
  }
};

export default reducer;
