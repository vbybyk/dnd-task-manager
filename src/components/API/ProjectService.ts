import Axios from "axios";

export class ProjectService {
  static getProjects = async () => await Axios.get("http://localhost:3001/projects");
  static getProjectById = async (projId: number) => await Axios.get(`http://localhost:3001/projects/${projId}`);
  static getProjectTasks = async (projId: number) =>
    await Axios.get(`http://localhost:3001/projects/${projId}/containers`);
  static getProjectTaskById = async (projId: number, container: string) =>
    await Axios.get(`http://localhost:3001/projects/${projId}/containers/${container}`);
  static updateProjectTasks = async (projId: number, containers: any) =>
    await Axios.put(`http://localhost:3001/projects/${projId}`, { containers });
}
