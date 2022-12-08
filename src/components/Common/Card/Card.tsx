import { ITask } from "../../Interfaces/tasks";
import { Divider } from "antd";
import { CheckSquareTwoTone } from "@ant-design/icons";
import "./card.scss";

export const Card = (props: any) => {
  const { id, tasks } = props;
  const { name, label, img }: ITask = tasks;

  return (
    <div className="card">
      {img && (
        <div>
          <div className="card-img">img</div>
          <Divider />
        </div>
      )}
      <span className="card-name">{name}</span>
      <div className="card-label">{label}</div>
      <span>
        <CheckSquareTwoTone twoToneColor="#1890ff" />
        <span> - </span>
        {id}
      </span>
    </div>
  );
};
