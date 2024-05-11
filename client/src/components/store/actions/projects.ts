import { AxiosError } from "axios";
import { IProject } from "../../Interfaces/tasks";

const getProjectsRequest = () => {
  return {
    type: "PROJECTS_REQUEST",
  };
};
const getProjectsSuccess = (projects: IProject[]) => {
  return {
    type: "PROJECTS_SUCCESS",
    payload: projects,
  };
};
const getProjectsError = (err: AxiosError) => {
  return {
    type: "PROJECTS_REQUEST_ERROR",
    payload: err?.response?.data,
  };
};
const postProjectRequest = () => {
  return {
    type: "PROJECTS_REQUEST",
  };
};
const postProjectSuccess = () => {
  return {
    type: "PROJECTS_SUCCESS",
  };
};
const postProjectError = (err: AxiosError) => {
  return {
    type: "PROJECTS_REQUEST_ERROR",
    payload: err?.response?.data,
  };
};
const getProjectRequest = () => {
  return {
    type: "PROJECT_REQUEST",
  };
};
const getProjectSuccess = (project: IProject) => {
  return {
    type: "PROJECT_SUCCESS",
    payload: project,
  };
};
const getProjectError = (err: AxiosError) => {
  return {
    type: "PROJECT_REQUEST_ERROR",
    payload: err?.response?.data,
  };
};

const addProject = (project: IProject) => {
  return {
    type: "ADD_PROJECT",
    payload: project,
  };
};

const updateProject = (project: IProject) => {
  return {
    type: "UPDATE_PROJECT",
    payload: project,
  };
};

export const projectActions = {
  getProjectsRequest,
  getProjectsSuccess,
  getProjectsError,
  postProjectRequest,
  postProjectSuccess,
  postProjectError,
  getProjectRequest,
  getProjectSuccess,
  getProjectError,
  addProject,
  updateProject,
};
