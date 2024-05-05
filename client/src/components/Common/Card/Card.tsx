import { ITask } from "../../Interfaces/tasks";
import { Divider } from "antd";
import { CheckSquareTwoTone } from "@ant-design/icons";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { tasksActions } from "../../store/actions/tasks";
import "./card.scss";

export const Card = (props: any) => {
  const dispatch: Dispatch = useDispatch();
  const { id, task } = props;
  const { name, label, img }: ITask = task;

  return (
    <div className="card" key={id} onClick={() => dispatch(tasksActions.toggleUpdateTaskModal())}>
      {img && (
        <div>
          <div className="card-img">img</div>
          <Divider />
        </div>
      )}
      <span className="card-name">{name}</span>
      {label && <div className="card-label">{label[0]?.label}</div>}
      <span>
        <CheckSquareTwoTone twoToneColor="#1890ff" />
        <span> - </span>
        {id}
      </span>
    </div>
  );
};
