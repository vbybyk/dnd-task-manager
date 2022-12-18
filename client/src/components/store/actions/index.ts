import { AxiosError, AxiosResponse } from "axios";

export const getProjectsRequest = () => {
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

export const getProjectRequest = () => {
  return {
    type: "PROJECT_REQUEST",
  };
};

export const getProjectSuccess = (project: any) => {
  return {
    type: "PROJECT_SUCCESS",
    payload: project,
  };
};

export const getProjectError = (err: AxiosError) => {
  return {
    type: "PROJECT_REQUEST_ERROR",
    payload: err?.response?.data,
  };
};

export const toggleUpdateTaskModal = () => {
  return {
    type: "TOGGLE_UPDATE_TASK_MODAL",
  };
};
