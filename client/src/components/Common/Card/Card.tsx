import { ITask } from "../../Interfaces/tasks";
import { Divider, Tag } from "antd";
import { CheckSquareTwoTone } from "@ant-design/icons";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { tasksActions } from "../../store/actions/tasks";
import "./card.scss";

export const Card = (props: any) => {
  const dispatch: Dispatch = useDispatch();
  const { id, task } = props;
  const { name, labels, images }: ITask = task;

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
            <Tag color={label.value} className="card-label" key={label.label}>
              {label.label}
            </Tag>
          ))}
        </div>
      )}
      <span>
        <CheckSquareTwoTone twoToneColor="#1890ff" />
        <span> - </span>
        {id}
      </span>
    </div>
  );
};
