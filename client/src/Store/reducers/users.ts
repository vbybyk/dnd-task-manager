import { AnyAction } from "redux";
import { IUser } from "../../Interfaces/tasks";

export interface IUserState {
  user: IUser | null;
  users: IUser[];
  isFetching: boolean;
}

const initialState: IUserState = {
  user: null,
  users: [],
  isFetching: false,
};

export const users = (state = initialState, action: AnyAction): IUserState => {
  switch (action.type) {
    case "USER_REQUEST":
    case "GET_USERS_REQUEST":
      return { ...state, isFetching: true };
    case "USER_SUCCESS":
    case "SET_USER":
      return { ...state, isFetching: false, user: action.payload };
    case "GET_USERS_SUCCESS":
      return { ...state, isFetching: false, users: action.payload };
    case "USER_REQUEST_ERROR":
    case "GET_USERS_ERROR":
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
