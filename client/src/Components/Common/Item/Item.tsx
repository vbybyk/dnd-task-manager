import { ITask } from "../../../Interfaces/tasks";
import { Card } from "../Card/Card";
import "./item.scss";

export const Item = ({
  task,
  dragOverlay,
  onClickTask,
}: {
  task?: ITask;
  dragOverlay?: any;
  onClickTask?: (task: ITask) => void;
}) => {
  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };
  return (
    <div style={style} className="item" onClick={() => task && onClickTask && onClickTask(task)}>
      {task && <Card task={task} />}
    </div>
  );
};
