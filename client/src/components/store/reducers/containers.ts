import { AnyAction } from "redux";
import { IContainer } from "../../Interfaces/tasks";

export interface IContainerState {
  containers: IContainer[];
  isFetching: boolean;
}

const initialState: IContainerState = {
  containers: [],
  isFetching: false,
};

export const containers = (state = initialState, action: AnyAction): IContainerState => {
  switch (action.type) {
    case "PROJECT_CONTAINERS_REQUEST":
      return { ...state, isFetching: true };
    case "PROJECT_CONTAINERS_SUCCESS":
      return { ...state, isFetching: false, containers: action.payload };
    case "PROJECT_CONTAINERS_REQUEST_ERROR":
      return { ...state, isFetching: false };
    case "ADD_CONTAINER":
      return { ...state, containers: [...state.containers, action.payload] };
    default:
      return state;
  }
};
