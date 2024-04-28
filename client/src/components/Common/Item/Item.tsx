import { ITask } from "../../Interfaces/tasks";
import { Card } from "../Card/Card";
import "./item.scss";

export const Item = ({
  task,
  dragOverlay,
  id,
  onClickTask,
}: {
  task?: ITask | undefined;
  dragOverlay?: any | undefined;
  id: number;
  onClickTask?: (task: ITask) => void;
}) => {
  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };
  return (
    <div style={style} className="item" onClick={() => task && onClickTask && onClickTask(task)}>
      {task && <Card id={id} task={task} />}
      {/* <span>Task name: {tasks?.name}</span> */}
    </div>
  );
};
