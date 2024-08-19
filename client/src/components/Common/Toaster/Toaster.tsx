import { useEffect } from "react";
import { message } from "antd";
import { useAlertContext } from "../../../Context/AlertContext";
import "./Toaster.scss";

const Toaster = () => {
  const { alert, setAlert } = useAlertContext();
  const [messageApi, contextHolder] = message.useMessage();

  const handleClose = (_: unknown, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({});
  };

  useEffect(() => {
    if (alert.message) {
      messageApi.open({
        key: "uniqueKey",
        type: alert.type,
        content: alert.message,
        duration: 3,
        //@ts-ignore
        onClose: handleClose,
        placement: "top",
      });
    }
  }, [alert]);

  return contextHolder;
};

export default Toaster;
