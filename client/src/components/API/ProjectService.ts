import Axios from "axios";

export class ProjectService {
  static getProjects = async () => await Axios.get("http://localhost:9000/projects");
  static getProjectById = async (projId: number) => await Axios.get(`http://localhost:9000/projects/${projId}`);
  static createProject = async (project: any) => await Axios.post("http://localhost:9000/projects/create", project);
  static updateProject = async (project: any) =>
    await Axios.put(`http://localhost:9000/projects/${project.id}`, project);
}
