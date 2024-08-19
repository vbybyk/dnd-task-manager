import Axios from "axios";
import { BACKEND_URL } from "../config";

export class LabelsService {
  static getProjectLabels = async (projId: number) => await Axios.get(`${BACKEND_URL}/projects/${projId}/labels`);
  static addNewProjectLabel = async (projId: number, label: any) =>
    await Axios.post(`${BACKEND_URL}/projects/${projId}/labels`, label);
  static updateProjectLabel = async (projId: number, label: any) =>
    await Axios.put(`${BACKEND_URL}/projects/${projId}/labels/${label.id}`, label);
  static updateProjectLabels = async (projId: number, labels: any[]) =>
    await Axios.put(`${BACKEND_URL}/projects/${projId}/labels`, labels);
  static deleteLabel = async (projId: number, labelId: number) =>
    await Axios.delete(`${BACKEND_URL}/projects/${projId}/labels/${labelId}`);
}
