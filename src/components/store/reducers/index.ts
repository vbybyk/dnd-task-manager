import { AnyAction } from "redux";

interface IState {
  projects?: any[] | undefined;
  isFetching: boolean;
}

const initialState: IState = {
  projects: [],
  isFetching: false,
};

const reducer = (state = initialState, action: AnyAction): IState => {
  switch (action.type) {
    case "PROJECTS_REQUEST":
    case "TASKS_UPDATED_REQUEST":
      return { ...state, isFetching: true };
    case "PROJECTS_SUCCESS":
      return { ...state, isFetching: false, projects: action.payload };
    case "TASK_UPDATED_SUCCESS":
      return { ...state, isFetching: false };
    case "PROJECTS_REQUEST_ERROR":
    case "TASKS_UPDATED_ERROR":
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default reducer;
