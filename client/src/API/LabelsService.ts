import Axios from "axios";

export class LabelsService {
  static getProjectLabels = async (projId: number) =>
    await Axios.get(`http://localhost:9000/projects/${projId}/labels`);
  static addNewProjectLabel = async (projId: number, label: any) =>
    await Axios.post(`http://localhost:9000/projects/${projId}/labels`, label);
  static updateProjectLabel = async (projId: number, label: any) =>
    await Axios.put(`http://localhost:9000/projects/${projId}/labels/${label.id}`, label);
  static updateProjectLabels = async (projId: number, labels: any[]) =>
    await Axios.put(`http://localhost:9000/projects/${projId}/labels`, labels);
  static deleteLabel = async (projId: number, labelId: number) =>
    await Axios.delete(`http://localhost:9000/projects/${projId}/labels/${labelId}`);
}
