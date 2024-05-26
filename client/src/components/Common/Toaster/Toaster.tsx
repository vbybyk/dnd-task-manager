import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "antd";
import { AlertProps } from "antd";
import { notification } from "antd";
import { alertActions } from "../../../Store/actions/alert";
import { IState } from "../../../Store/reducers";
import "./Toaster.scss";

const AlertMessage = ({ type, message, description }: AlertProps) => {
  return (
    <Alert message={message} description={description} type={type} showIcon closable style={{ padding: "15px" }} />
  );
};

const Toaster = () => {
  const alert = useSelector((state: IState) => state.alert);
  const dispatch = useDispatch();

  const handleClose = (_: unknown, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(alertActions.clear());
  };

  useEffect(() => {
    if (alert.message) {
      notification.open({
        key: "uniqueKey",
        message: <AlertMessage type={alert.type} message={alert.message} description="" />,
        description: "",
        duration: 3,
        //@ts-ignore
        onClose: handleClose,
        closeIcon: false,
        className: "alert-notification",
        placement: "top",
      });
    }
  }, [alert]);

  return null;
};

export default Toaster;
