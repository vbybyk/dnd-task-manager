import { Sidebar } from "../../Components/Common/Sidebar/Sidebar";
import "./AppLayout.scss";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="AppLayout">
      <Sidebar />
      <div className="Main">{children}</div>
    </div>
  );
};
