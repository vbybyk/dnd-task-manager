import { AxiosError, AxiosResponse } from "axios";
import { IContainer, IProject, ITask } from "../../Interfaces/tasks";

export const getProjectsRequest = () => {
  return {
    type: "PROJECTS_REQUEST",
  };
};
export const getProjectsSuccess = (projects: IProject[]) => {
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
export const getProjectSuccess = (project: IProject) => {
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
export const getTasksRequest = () => {
  return {
    type: "PROJECT_TASKS_REQUEST",
  };
};
export const getTasksSuccess = (tasks: ITask[]) => {
  return {
    type: "PROJECT_TASKS_SUCCESS",
    payload: tasks,
  };
};
export const getTasksError = (err: AxiosError) => {
  return {
    type: "PROJECT_TASKS_REQUEST_ERROR",
    payload: err?.response?.data,
  };
};
export const getContainersRequest = () => {
  return {
    type: "PROJECT_CONTAINERS_REQUEST",
  };
};
export const getContainersSuccess = (containers: IContainer[]) => {
  return {
    type: "PROJECT_CONTAINERS_SUCCESS",
    payload: containers,
  };
};
export const getContainersError = (err: AxiosError) => {
  return {
    type: "PROJECT_CONTAINERS_REQUEST_ERROR",
    payload: err?.response?.data,
  };
};

export const setNewTask = (task: ITask) => {
  return {
    type: "SET_NEW_TASK",
    payload: task,
  };
};

export const setTask = (task: ITask) => {
  return {
    type: "SET_TASK",
    payload: task,
  };
};

export const deleteTask = (id: number) => {
  return {
    type: "DELETE_TASK",
    payload: id,
  };
};
