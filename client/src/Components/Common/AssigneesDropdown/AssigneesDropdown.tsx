import { useMemo } from "react";
import { Dropdown, Avatar, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { IState } from "../../../Store/reducers";
import { generateColor } from "../../../Utils/color-generator";

interface IAssigneesDropdownProps {
  value?: number;
  onChange: (value: number) => void;
  size?: "small" | "large";
}

export const AssigneesDropdown = (props: IAssigneesDropdownProps) => {
  const { value, onChange, size = "large" } = props;
  const { users } = useSelector((state: IState) => state.users);

  const userMenu = users.map((user) => ({
    label: user.name,
    key: user.id?.toString(),
    onClick: () => onChange(user.id),
    icon: (
      <Avatar
        src={user.profileImage}
        style={{ backgroundColor: !user.profileImage ? generateColor(user.name) : "transparent" }}
      >
        {user.name.split(" ").map((name) => name[0]?.toUpperCase())}
      </Avatar>
    ),
  }));

  const selectedUser = useMemo(() => users.find((user) => user.id === value), [users, value]);
  const isSmall = size === "small";

  return (
    <Dropdown
      menu={{ items: userMenu, selectable: true, defaultSelectedKeys: value ? [value?.toString()] : [] }}
      trigger={["click"]}
      className="flex"
      overlayClassName="user-menu-dropdown"
    >
      <div>
        <Tooltip
          title={isSmall && selectedUser?.name}
          placement="top"
          overlayClassName="priority-tooltip"
          arrow={false}
        >
          <Avatar
            icon={!selectedUser && <UserOutlined />}
            src={selectedUser?.profileImage || undefined}
            style={{
              backgroundColor: !selectedUser?.profileImage ? generateColor(selectedUser?.name) : "transparent",
              cursor: "pointer",
            }}
            size={isSmall ? 24 : 32}
          >
            {selectedUser?.name.split(" ").map((name) => name[0]?.toUpperCase())}
          </Avatar>
        </Tooltip>
        {!isSmall && <span style={{ marginLeft: "10px" }}>{users.find((user) => user.id === value)?.name} </span>}
      </div>
    </Dropdown>
  );
};
