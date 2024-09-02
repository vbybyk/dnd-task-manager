import React from "react";
import { usePopupContext } from "../../../Context/PopupContext";
import { Modal, Button } from "antd";
import { IPopupButton } from "../../../Interfaces/popup";

export const Popup: React.FC = () => {
  const { popup, setPopup } = usePopupContext();

  const handleCancel = () => {
    if (popup.onCancel) {
      popup.onCancel();
    }
    setPopup(null);
  };

  const buttons: IPopupButton[] = [
    { type: "default", text: "Cancel", onClick: handleCancel },
    ...(popup?.buttons || []),
  ];

  const renderButtons = buttons.map((props: IPopupButton) => {
    const { type, text, danger, disabled, loading, onClick } = props;
    return (
      <Button
        key={type}
        type={type}
        danger={danger}
        disabled={disabled}
        loading={loading}
        onClick={() => {
          onClick && onClick();
          setPopup(null);
        }}
      >
        {text}
      </Button>
    );
  });

  return popup ? (
    <Modal title={popup.title || ""} open={popup.open} onCancel={handleCancel} footer={renderButtons} centered>
      <p>{popup.content}</p>
    </Modal>
  ) : null;
};
