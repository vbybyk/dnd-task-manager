import Axios from "axios";
import { BACKEND_URL } from "../config";

export class ContainersService {
  static addNewContainer = async (container: any) =>
    await Axios.post(`${BACKEND_URL}/projects/${container.projectId}/containers`, container);
  static getProjectContainers = async (projId: number) =>
    await Axios.get(`${BACKEND_URL}/projects/${projId}/containers`);
}
