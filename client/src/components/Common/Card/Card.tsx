import { ITask } from "../../Interfaces/tasks";
import { Divider } from "antd";
import { CheckSquareTwoTone } from "@ant-design/icons";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { toggleUpdateTaskModal } from "../../store/actions";
import "./card.scss";

export const Card = (props: any) => {
  const dispatch: Dispatch = useDispatch();
  const { id, tasks } = props;
  const { name, label, img }: ITask = tasks;

  const onClick = (e: any) => {
    console.log("modal", e);
  };

  return (
    <div className="card" key={id} onClick={() => dispatch(toggleUpdateTaskModal())}>
      {img && (
        <div>
          <div className="card-img">img</div>
          <Divider />
        </div>
      )}
      <span className="card-name">{name}</span>
      {label && <div className="card-label">{label[0].label}</div>}
      <span>
        <CheckSquareTwoTone twoToneColor="#1890ff" />
        <span> - </span>
        {id}
      </span>
    </div>
  );
};
