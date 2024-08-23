import { useState } from "react";
import { IPopupState, IPopupProps } from "../Interfaces/popup";

const usePopups = () => {
  const [popup, setPopup] = useState<IPopupProps | null>(null as unknown as IPopupProps);
  return {
    popup,
    setPopup,
  } as IPopupState;
};

export default usePopups;
