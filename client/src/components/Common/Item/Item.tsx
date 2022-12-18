import { ITask } from "../../Interfaces/tasks";
import { Card } from "../Card/Card";
import "./item.scss";

export const Item = ({
  tasks,
  dragOverlay,
  id,
}: {
  tasks?: ITask | undefined;
  dragOverlay?: any | undefined;
  id: number;
}) => {
  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };
  return (
    <div style={style} className="item">
      {tasks && <Card id={id} tasks={tasks} />}
      {/* <span>Task name: {tasks?.name}</span> */}
    </div>
  );
};
