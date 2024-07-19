import { useSelector } from "react-redux";
import { Layout, Menu, Avatar, Dropdown, Divider } from "antd";
import { UserCircle, Gear } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { UserOutlined, DownOutlined, SettingOutlined } from "@ant-design/icons";
import "./header.scss";

const { Header } = Layout;

export const HeaderApp: React.FC = () => {
  const { projects } = useSelector((state: any) => state.project);

  const userMenu = [
    {
      label: (
        <div className="menu-item">
          <UserCircle size={20} /> <span>Profile</span>
        </div>
      ),
      key: "profile",
    },
    {
      label: (
        <div className="menu-item">
          <Gear size={20} /> <span>Settings</span>
        </div>
      ),
      key: "settings",
    },
    { label: <Divider style={{ margin: 0 }} />, key: "divider", type: "divider" },
    { label: "Logout", key: "logout" },
  ];

  return (
    <Layout>
      <Header className="header">
        <div className="header-container">
          <div className="header-title">
            <h2>Task Manager</h2>
          </div>
          <div className="header-user flex">
            <Dropdown
              menu={{ items: userMenu }}
              trigger={["click"]}
              className="flex"
              overlayClassName="user-menu-dropdown"
            >
              <div>
                <Avatar icon={<UserOutlined />} />
                <DownOutlined style={{ color: "grey", fontSize: "10px", marginLeft: "3px" }} />
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    </Layout>
  );
};
