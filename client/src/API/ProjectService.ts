import Axios from "axios";
import { BACKEND_URL } from "../config";

export class ProjectService {
  static getProjects = async () => await Axios.get(`${BACKEND_URL}/projects`);
  static getProjectById = async (projId: number) => await Axios.get(`${BACKEND_URL}/projects/${projId}`);
  static createProject = async (project: any) => await Axios.post(`${BACKEND_URL}/projects/create`, project);
  static updateProject = async (project: any) => await Axios.put(`${BACKEND_URL}/projects/${project.id}`, project);
  static deleteProject = async (projId: number) => await Axios.delete(`${BACKEND_URL}/projects/${projId}`);
}
