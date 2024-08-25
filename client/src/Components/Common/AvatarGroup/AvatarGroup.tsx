import { Avatar, Tooltip } from "antd";
import { generateColor } from "../../../Utils/color-generator";
import { IUser } from "../../../Interfaces/tasks";

export const AvatarGroup = ({ users }: { users: IUser[] }) => {
  return (
    <Avatar.Group max={{ count: 5 }} style={{ marginLeft: "100px" }}>
      {users.map((user) => (
        <Tooltip title={user.name} key={user.id} placement="top" overlayClassName="priority-tooltip" arrow={false}>
          <Avatar key={user.id} src={user.profileImage} style={{ backgroundColor: generateColor(user.name) }}>
            {user.name.split(" ").map((name) => name[0]?.toUpperCase())}
          </Avatar>
        </Tooltip>
      ))}
    </Avatar.Group>
  );
};
