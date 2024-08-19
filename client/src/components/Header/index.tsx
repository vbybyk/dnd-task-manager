import { useSelector } from "react-redux";
import { Layout, Menu, Avatar, Dropdown, Divider } from "antd";
import { UserCircle, Gear } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { UserOutlined, DownOutlined, SettingOutlined } from "@ant-design/icons";
import "./header.scss";

const { Header } = Layout;

const HeaderApp: React.FC = () => {
  const { projects } = useSelector((state: any) => state.project);
  const { user } = useSelector((state: any) => state.users);

  const userMenu = [
    {
      label: (
        <NavLink to={`/users/${user?.id}`} className="menu-item">
          <UserCircle size={20} /> <span>Profile</span>
        </NavLink>
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
              // @ts-ignore
              menu={{ items: userMenu }}
              trigger={["click"]}
              className="flex"
              overlayClassName="user-menu-dropdown"
            >
              <div>
                <Avatar icon={<UserOutlined />} src={user?.profileImage} />
                <DownOutlined style={{ color: "grey", fontSize: "10px", marginLeft: "3px" }} />
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default HeaderApp;
