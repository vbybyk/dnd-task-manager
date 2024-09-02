import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Divider } from "antd";
import { SortableItem } from "../SortableItem/SortableItem";
import { ITask } from "../../../Interfaces/tasks";
import "./droppable.scss";

interface IDroppableProps {
  id: string;
  items: ITask[];
  name: string;
  onClickTask: (task: ITask) => void;
  activeId?: string | null;
}

export function Droppable(props: IDroppableProps) {
  const { id, items, name, onClickTask } = props;
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items.map((item) => item._id)} strategy={rectSortingStrategy}>
      <div className="droppable-container" ref={setNodeRef}>
        <div className="droppable-container__name-wrapper">
          <h4 className="droppable-container__name">{name}</h4>
        </div>
        <Divider style={{ margin: "7px 0" }} />
        {items.map((item: any) => (
          <SortableItem key={item._id} id={item._id} task={item} onClickTask={onClickTask} />
        ))}
      </div>
    </SortableContext>
  );
}
