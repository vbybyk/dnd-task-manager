import { ITask } from "../../Interfaces/tasks";
import { Divider } from "antd";
import "./card.scss";

export const Card = (props: any) => {
  const { id, tasks } = props;
  const { name, label, img }: ITask = tasks;
  // console.log("props", props);
  // console.log("description", description);
  return (
    <div className="card">
      {img && (
        <div>
          <div className="card-img">img</div>
          <Divider />
        </div>
      )}
      <h3 className="card-name">{name}</h3>
      {/* <span>{description}</span> */}
      <span>Task # {id}</span>
      <span>{label}</span>
    </div>
  );
};
