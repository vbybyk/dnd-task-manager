import React, { createContext, useContext } from "react";
import usePopup from "../Hooks/usePopup";
import { IPopupState } from "../Interfaces/popup";

export const PopupContext = createContext(null as IPopupState | null);

export const usePopupContext = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopupContext must be used within a PopupContextProvider");
  }
  return context;
};

const PopupContextProvider = ({ children }: any) => {
  return (
    <PopupContext.Provider
      value={{
        ...usePopup(),
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContextProvider;
