import { AxiosError } from "axios";
import { ILabel } from "../../Interfaces/tasks";

const getLabelsRequest = () => {
  return {
    type: "PROJECT_LABELS_REQUEST",
  };
};
const getLabelsSuccess = (labels: ILabel[]) => {
  return {
    type: "PROJECT_LABELS_SUCCESS",
    payload: labels,
  };
};
const getLabelsError = (err: AxiosError) => {
  return {
    type: "PROJECT_LABELS_REQUEST_ERROR",
    payload: err?.response?.data,
  };
};
const addLabel = (label: ILabel) => {
  return {
    type: "ADD_LABEL",
    payload: label,
  };
};

export const labelsActions = {
  getLabelsRequest,
  getLabelsSuccess,
  getLabelsError,
  addLabel,
};