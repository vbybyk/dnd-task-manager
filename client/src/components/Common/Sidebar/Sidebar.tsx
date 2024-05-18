import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { HomeOutlined, CarryOutOutlined, ProjectOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { IProject } from "../../Interfaces/tasks";
import "./Sidebar.scss";

export const Sidebar = () => {
  const { projects } = useSelector((state: any) => state.project);

  return (
    <div className="Sidebar">
      <div className="Sidebar__menu">
        <ul>
          <li>
            <NavLink to="/dashboard">
              <HomeOutlined style={{ marginRight: "15px" }} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <CarryOutOutlined style={{ marginRight: "15px" }} />
              My Work
            </NavLink>
          </li>
          <Divider />
          <li className="title">Projects</li>
          {projects?.map((item: IProject) => (
            <li key={item.id}>
              <NavLink to={`/projects/${item.id}`}>
                <ProjectOutlined style={{ marginRight: "15px" }} />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
