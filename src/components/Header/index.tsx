import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "./header.scss";

const { Header } = Layout;

export const HeaderApp: React.FC = () => {
  const items = [
    { label: <Link to={"/list"}>List</Link>, key: "/list" },
    { label: <Link to={"/favorite"}>Favorite</Link>, key: "/favorite" },
  ];
  return (
    <Layout>
      <Header className="header">
        <div className="header-container">
          <div className="header-title">
            <h1>Tasks list page</h1>
          </div>
          <Menu mode="horizontal" selectable={false} className="menu" items={items} />
        </div>
      </Header>
    </Layout>
  );
};
