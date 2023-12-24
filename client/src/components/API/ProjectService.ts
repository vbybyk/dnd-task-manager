import Axios from "axios";

export class ProjectService {
  static getProjects = async () => await Axios.get("http://localhost:9000/projects");
  static getProjectById = async (projId: number) => await Axios.get(`http://localhost:9000/projects/${projId}`);
  static getProjectTasks = async (projId: number) =>
    await Axios.get(`http://localhost:9000/projects/${projId}/containers`);
  static getProjectTaskById = async (projId: number, container: string) =>
    await Axios.get(`http://localhost:9000/projects/${projId}/containers/${container}`);
  static updateProjectTasks = async (projId: number, containers: any) =>
    await Axios.patch(`http://localhost:9000/projects/${projId}`, { containers });
  static addNewProjectTask = async (projId: number, task: any) =>
    await Axios.patch(`http://localhost:9000/projects/${projId}/containers`, { task });
}
