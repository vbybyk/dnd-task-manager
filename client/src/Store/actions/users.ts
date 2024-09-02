import { AxiosError } from "axios";
import { IUser } from "../../Interfaces/tasks";

const getUserRequest = () => {
  return {
    type: "USER_REQUEST",
  };
};
const getUserSuccess = (user: IUser) => {
  return {
    type: "USER_SUCCESS",
    payload: user,
  };
};
const getUserError = (err: AxiosError) => {
  return {
    type: "USER_REQUEST_ERROR",
    payload: err?.response?.data,
  };
};
const setUser = (user: IUser) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

const getUsersRequest = () => {
  return {
    type: "GET_USERS_REQUEST",
  };
};
const getUsersSuccess = (users: IUser[]) => {
  return {
    type: "GET_USERS_SUCCESS",
    payload: users,
  };
};
const getUsersError = (err: AxiosError) => {
  return {
    type: "GET_USERS_ERROR",
    payload: err?.response?.data,
  };
};

export const usersActions = {
  getUserRequest,
  getUserSuccess,
  getUserError,
  setUser,
  getUsersRequest,
  getUsersSuccess,
  getUsersError,
};
