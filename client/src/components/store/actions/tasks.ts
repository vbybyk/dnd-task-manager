import { AxiosError } from "axios";
import { ITask } from "../../Interfaces/tasks";

const toggleUpdateTaskModal = () => {
  return {
    type: "TOGGLE_UPDATE_TASK_MODAL",
  };
};
const getTasksRequest = () => {
  return {
    type: "PROJECT_TASKS_REQUEST",
  };
};
const getTasksSuccess = (tasks: ITask[]) => {
  return {
    type: "PROJECT_TASKS_SUCCESS",
    payload: tasks,
  };
};
const getTasksError = (err: AxiosError) => {
  return {
    type: "PROJECT_TASKS_REQUEST_ERROR",
    payload: err?.response?.data,
  };
};

const setNewTask = (task: ITask) => {
  return {
    type: "SET_NEW_TASK",
    payload: task,
  };
};

const setTask = (task: ITask) => {
  return {
    type: "SET_TASK",
    payload: task,
  };
};

const deleteTask = (id: number) => {
  return {
    type: "DELETE_TASK",
    payload: id,
  };
};

export const tasksActions = {
  toggleUpdateTaskModal,
  getTasksRequest,
  getTasksSuccess,
  getTasksError,
  setNewTask,
  setTask,
  deleteTask,
};
