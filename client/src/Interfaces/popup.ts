import { ButtonProps } from "antd/lib/button";

export interface IPopupProps {
  open: boolean;
  title?: string;
  content?: string;
  onCancel?: () => void;
  buttons?: IPopupButton[];
}

export interface IPopupState {
  popup: IPopupProps;
  setPopup: (popup: IPopupProps | null) => void;
}

export interface IPopupButton {
  text?: string;
  type?: ButtonProps["type"];
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}
