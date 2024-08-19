import React from "react";
import AlertContext from "./AlertContext";

const AppContext = ({ children }: any) => {
  return <AlertContext>{children}</AlertContext>;
};

export default AppContext;
