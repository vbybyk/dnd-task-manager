import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { HomeOutlined, CarryOutOutlined, ProjectOutlined } from "@ant-design/icons";
import { Divider, Menu } from "antd";
import { IProject } from "../../../Interfaces/tasks";
import "./Sidebar.scss";

export const Sidebar = () => {
  const { projects } = useSelector((state: any) => state.project);
  const location = useLocation();

  const activeKey = location.pathname;

  const projectItems = projects?.map((item: IProject) => ({
    key: `/projects/${item.id}`,
    icon: <ProjectOutlined />,
    label: <NavLink to={`/projects/${item.id}`}>{item.name}</NavLink>,
  }));

  const items = [
    {
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: <NavLink to="/dashboard">Dashboard</NavLink>,
    },
    // {
    //   key: "/mywork",
    //   icon: <CarryOutOutlined />,
    //   label: <NavLink to="/">All Tasks</NavLink>,
    // },
    {
      key: "divider",
      disabled: true,
      label: <Divider />,
      style: { cursor: "default" },
    },
    ...(projectItems || []),
  ];

  return (
    <div className="Sidebar">
      <Menu mode="inline" items={items} className="Sidebar__menu" selectedKeys={[activeKey]} />
    </div>
  );
};
