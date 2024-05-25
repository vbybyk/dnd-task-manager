import Axios from "axios";

export class LabelsService {
  static getProjectLabels = async (projId: number) =>
    await Axios.get(`http://localhost:9000/projects/${projId}/labels`);
  static updateProjectLabels = async (projId: number, labels: any) =>
    await Axios.put(`http://localhost:9000/projects/${projId}/labels`, labels);
  static addNewLabel = async (label: any) => await Axios.post(`http://localhost:9000/labels/create`, label);
  static updateLabel = async (labelId: number, label: any) =>
    await Axios.put(`http://localhost:9000/labels/${labelId}`, label);
  static deleteLabel = async (labelId: number) => await Axios.delete(`http://localhost:9000/labels/${labelId}`);
}
