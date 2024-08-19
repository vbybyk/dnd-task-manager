import React, { createContext, useContext } from "react";
import useAlerts from "../Hooks/useAlerts";
import { IAlertState } from "../Interfaces/alerts";

export const AlertContext = createContext(null as IAlertState | null);

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlertContext must be used within a AlertContextProvider");
  }
  return context;
};

const AlertContextProvider = ({ children }: any) => {
  return (
    <AlertContext.Provider
      value={{
        ...useAlerts(),
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
