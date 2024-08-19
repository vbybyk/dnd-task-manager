import Axios from "axios";
import { BACKEND_URL } from "../config";

export class TasksService {
  static getProjectTasks = async (projId: number) => await Axios.get(`${BACKEND_URL}/projects/${projId}/tasks`);
  static updateProjectTasks = async (projId: number, tasks: any) =>
    await Axios.put(`${BACKEND_URL}/projects/${projId}/tasks`, tasks);
  static addNewTask = async (task: any) => await Axios.post(`${BACKEND_URL}/tasks/create`, task);
  static updateTask = async (taskId: number, task: any) => await Axios.put(`${BACKEND_URL}/tasks/${taskId}`, task);
  static deleteTask = async (taskId: number) => await Axios.delete(`${BACKEND_URL}/tasks/${taskId}`);
  static uploadImage = async (formData: FormData) =>
    await Axios.post(`${BACKEND_URL}/tasks/upload-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
}
