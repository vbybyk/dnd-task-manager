import { AlertProps } from "antd";

export interface IAlertState {
  alert: AlertProps;
  setAlert: (alert: AlertProps) => void;
}
