import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { Divider, Tag } from "antd";
import { AssigneesDropdown } from "../AssigneesDropdown/AssigneesDropdown";
import { CheckSquareTwoTone } from "@ant-design/icons";
import { PriorityIcon } from "../PriorityIcon/PriorityIcon";
import { TasksService } from "../../../API/TasksService";
import { tasksActions } from "../../../Store/actions/tasks";
import { ITask } from "../../../Interfaces/tasks";
import { useAlertContext } from "../../../Context/AlertContext";
import "./card.scss";

export const Card = (props: any) => {
  const dispatch: Dispatch = useDispatch();
  const { setAlert } = useAlertContext();
  const { id, task } = props;
  const { name, labels, images, assigneeId }: ITask = task;

  const onChangeAssignee = async (assigneeId: number) => {
    try {
      const res = await TasksService.updateTask(task.id, {
        ...task,
        assigneeId,
      });
      dispatch(tasksActions.setTask(res.data));
      setAlert({ type: "success", message: "Updated successfully!" });
    } catch (err) {
      setAlert({ type: "error", message: "Something went wrong!" });
      console.log(err);
    }
  };

  return (
    <div className="Card" key={id} onClick={() => dispatch(tasksActions.toggleUpdateTaskModal())}>
      {!!images?.length && (
        <div>
          <div className="card-img">
            <img src={images[0]} alt="task" />
          </div>
          <Divider />
        </div>
      )}
      <span className="card-name">{name}</span>
      {!!labels?.length && (
        <div className="flex">
          {labels.map((label) => (
            <Tag key={label.id} color={label.value} className="card-label" style={{ color: label.color }}>
              {label.label}
            </Tag>
          ))}
        </div>
      )}
      <footer>
        <span>
          <CheckSquareTwoTone twoToneColor="#1890ff" />
          <span> - </span>
          {id}
        </span>
        <div className="footer-right">
          <PriorityIcon priority={task.priority} />
          <div onClick={(event) => event.stopPropagation()} style={{ marginLeft: "8px" }}>
            <AssigneesDropdown value={assigneeId} onChange={(value: number) => onChangeAssignee(value)} size="small" />
          </div>
        </div>
      </footer>
    </div>
  );
};
