import { useState } from "react";
import { AlertProps } from "antd";
import { IAlertState } from "../Interfaces/alerts";

const useAlerts = () => {
  const [alert, setAlert] = useState<AlertProps>({});
  console.log("alert in useAlert", alert);
  return {
    alert,
    setAlert,
  } as IAlertState;
};

export default useAlerts;
