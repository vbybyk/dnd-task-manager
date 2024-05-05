import Axios from "axios";

export class ContainersService {
  static addNewContainer = async (container: any) =>
    await Axios.post(`http://localhost:9000/projects/${container.projectId}/containers`, container);
  static getProjectContainers = async (projId: number) =>
    await Axios.get(`http://localhost:9000/projects/${projId}/containers`);
}
