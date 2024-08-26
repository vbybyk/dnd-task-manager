import React from "react";
import { Avatar, Tooltip } from "antd";
import { generateColor } from "../../../Utils/color-generator";
import { IUser } from "../../../Interfaces/tasks";

interface IAvatarGroupProps {
  users: IUser[];
  selectedUsers: number[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<number[]>>;
}

export const AvatarGroup = (props: IAvatarGroupProps) => {
  const { users, selectedUsers, setSelectedUsers } = props;

  const onClick = (id: number) => {
    setSelectedUsers((prev: number[]) => {
      if (prev.includes(id)) {
        return prev.filter((userId) => userId !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <Avatar.Group max={{ count: 5 }} style={{ marginLeft: "100px" }}>
      {users.map((user) => (
        <Tooltip title={user.name} key={user.id} placement="top" overlayClassName="priority-tooltip" arrow={false}>
          <div onClick={() => onClick(user.id)}>
            <Avatar
              key={user.id}
              src={user.profileImage}
              style={{
                backgroundColor: generateColor(user.name),
                cursor: "pointer",
                border: selectedUsers.includes(user.id) ? "2px solid #0a66e4" : "none",
              }}
            >
              {user.name.split(" ").map((name) => name[0]?.toUpperCase())}
            </Avatar>
          </div>
        </Tooltip>
      ))}
    </Avatar.Group>
  );
};
