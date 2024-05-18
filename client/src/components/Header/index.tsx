import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.scss";

const { Header } = Layout;

export const HeaderApp: React.FC = () => {
  const { projects } = useSelector((state: any) => state.project);

  // const items = [
  //   { label: <Link to={"/dashboard"}>Dashboard</Link>, key: "/dashboard" },
  //   {
  //     label: "Projects",
  //     key: "/projects",
  //     children: projects?.map((item: any) => {
  //       return { label: <Link to={`/projects/${item.id}`}>{item?.name}</Link>, key: `/project-${item.id}` };
  //     }),
  //   },
  // ];

  return (
    <Layout>
      <Header className="header">
        <div className="header-container">
          <div className="header-title">
            <h2>Task Manager</h2>
          </div>
          {/* <Menu mode="horizontal" selectable={false} className="menu" items={items} /> */}
        </div>
      </Header>
    </Layout>
  );
};
