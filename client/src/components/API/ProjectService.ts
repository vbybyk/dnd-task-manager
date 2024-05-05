import Axios from "axios";

export class ProjectService {
  static getProjects = async () => await Axios.get("http://localhost:9000/projects");
  static getProjectById = async (projId: number) => await Axios.get(`http://localhost:9000/projects/${projId}`);
  static createProject = async (project: any) => await Axios.post("http://localhost:9000/projects/create", project);
  static getProjectTasks = async (projId: number) => await Axios.get(`http://localhost:9000/projects/${projId}/tasks`);
  static getProjectTaskById = async (projId: number, container: string) =>
    await Axios.get(`http://localhost:9000/projects/${projId}/containers/${container}`);
  static updateProjectTasks = async (projId: number, tasks: any) =>
    await Axios.put(`http://localhost:9000/projects/${projId}/tasks`, tasks);
  static addNewProjectTask = async (task: any) => await Axios.post(`http://localhost:9000/tasks/create`, task);
  static addNewContainer = async (container: any) =>
    await Axios.post(`http://localhost:9000/projects/${container.projectId}/containers`, container);
  static getProjectContainers = async (projId: number) =>
    await Axios.get(`http://localhost:9000/projects/${projId}/containers`);
  static updateTask = async (taskId: number, task: any) =>
    await Axios.put(`http://localhost:9000/tasks/${taskId}`, task);
  static deleteTask = async (taskId: number) => await Axios.delete(`http://localhost:9000/tasks/${taskId}`);
}
