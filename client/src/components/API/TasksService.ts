import Axios from "axios";

export class TasksService {
  static getProjectTasks = async (projId: number) => await Axios.get(`http://localhost:9000/projects/${projId}/tasks`);
  static updateProjectTasks = async (projId: number, tasks: any) =>
    await Axios.put(`http://localhost:9000/projects/${projId}/tasks`, tasks);
  static addNewTask = async (task: any) => await Axios.post(`http://localhost:9000/tasks/create`, task);
  static updateTask = async (taskId: number, task: any) =>
    await Axios.put(`http://localhost:9000/tasks/${taskId}`, task);
  static deleteTask = async (taskId: number) => await Axios.delete(`http://localhost:9000/tasks/${taskId}`);
}
