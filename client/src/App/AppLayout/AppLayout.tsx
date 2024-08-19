import { useLocation } from "react-router-dom";
import { Sidebar } from "../../Components/Common/Sidebar/Sidebar";
import "./AppLayout.scss";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <div className="AppLayout">
      <Sidebar />
      <div className="Main">{children}</div>
    </div>
  );
};
