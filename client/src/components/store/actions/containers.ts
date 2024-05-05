import { AxiosError } from "axios";
import { IContainer } from "../../Interfaces/tasks";

const getContainersRequest = () => {
  return {
    type: "PROJECT_CONTAINERS_REQUEST",
  };
};
const getContainersSuccess = (containers: IContainer[]) => {
  return {
    type: "PROJECT_CONTAINERS_SUCCESS",
    payload: containers,
  };
};
const getContainersError = (err: AxiosError) => {
  return {
    type: "PROJECT_CONTAINERS_REQUEST_ERROR",
    payload: err?.response?.data,
  };
};

const addContainer = (container: IContainer) => {
  return {
    type: "ADD_CONTAINER",
    payload: container,
  };
};

export const containersActions = {
  getContainersRequest,
  getContainersSuccess,
  getContainersError,
  addContainer,
};
