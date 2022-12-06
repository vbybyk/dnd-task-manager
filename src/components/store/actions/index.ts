import { AxiosError, AxiosResponse } from "axios";

export const getProjectRequest = () => {
  return {
    type: "PROJECTS_REQUEST",
  };
};

export const getProjectsSuccess = (projects: any) => {
  return {
    type: "PROJECTS_SUCCESS",
    payload: projects,
  };
};

export const getProjectsError = (err: AxiosError) => {
  return {
    type: "PROJECTS_REQUEST_ERROR",
    payload: err?.response?.data,
  };
};
export const postProjectRequest = () => {
  return {
    type: "PROJECTS_REQUEST",
  };
};

export const postProjectSuccess = () => {
  return {
    type: "PROJECTS_SUCCESS",
  };
};

export const postProjectError = (err: AxiosError) => {
  return {
    type: "PROJECTS_REQUEST_ERROR",
    payload: err?.response?.data,
  };
};
