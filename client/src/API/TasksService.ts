import Axios from "axios";
import { BACKEND_URL } from "../config";
import { ITask } from "../Interfaces/tasks";

export class TasksService {
  static getProjectTasks = async (projId: number) => await Axios.get(`${BACKEND_URL}/projects/${projId}/tasks`);
  static updateProjectTasks = async (projId: number, tasks: ITask[]) =>
    await Axios.put(`${BACKEND_URL}/projects/${projId}/tasks`, tasks);
  static addNewTask = async (task: ITask) => await Axios.post(`${BACKEND_URL}/projects/${task.projectId}/task`, task);
  static updateTask = async (task: ITask) =>
    await Axios.put(`${BACKEND_URL}/projects/${task.projectId}/tasks/${task.id}`, task);
  static deleteTask = async (projectId: number, taskId: number) =>
    await Axios.delete(`${BACKEND_URL}/projects/${projectId}/tasks/${taskId}`);
  static uploadImage = async (formData: FormData) =>
    await Axios.post(`${BACKEND_URL}/tasks/upload-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
}
