import AlertContext from "./AlertContext";
import PopupContext from "./PopupContext";

const AppContext = ({ children }: any) => {
  return (
    <AlertContext>
      <PopupContext>{children}</PopupContext>
    </AlertContext>
  );
};

export default AppContext;
