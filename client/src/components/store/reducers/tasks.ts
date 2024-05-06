import { AnyAction } from "redux";
import { ITask } from "../../Interfaces/tasks";

export interface ITasksState {
  tasks: ITask[];
  isFetching: boolean;
}

const initialState: ITasksState = {
  tasks: [],
  isFetching: false,
};

export const tasks = (state = initialState, action: AnyAction): ITasksState => {
  switch (action.type) {
    case "PROJECT_TASKS_REQUEST":
      return { ...state, isFetching: true };
    case "PROJECT_TASKS_SUCCESS":
      return { ...state, isFetching: false, tasks: action.payload };
    case "PROJECT_TASKS_REQUEST_ERROR":
      return { ...state, isFetching: false };
    case "SET_NEW_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "SET_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
      };
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
    default:
      return state;
  }
};
