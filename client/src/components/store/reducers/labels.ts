import { AnyAction } from "redux";
import { ILabel } from "../../Interfaces/tasks";

export interface ILabelState {
  labels: ILabel[];
  isFetching: boolean;
}

const initialState: ILabelState = {
  labels: [],
  isFetching: false,
};

export const labels = (state = initialState, action: AnyAction): ILabelState => {
  switch (action.type) {
    case "PROJECT_LABELS_REQUEST":
      return { ...state, isFetching: true };
    case "PROJECT_LABELS_SUCCESS":
      return { ...state, isFetching: false, labels: action.payload };
    case "PROJECT_LABELS_REQUEST_ERROR":
      return { ...state, isFetching: false };
    case "ADD_LABEL":
      return { ...state, labels: [...state.labels, action.payload] };
    default:
      return state;
  }
};
