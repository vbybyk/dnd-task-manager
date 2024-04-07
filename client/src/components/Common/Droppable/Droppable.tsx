import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Divider } from "antd";
import { SortableItem } from "../SortableItem/SortableItem";
import "./droppable.scss";

export function Droppable(props: any) {
  const { id, items, name } = props;
  const { isOver, setNodeRef } = useDroppable({ id });

  // console.log("items in Droppable", items);

  return (
    <>
      <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        <div className="droppable-container" ref={setNodeRef}>
          <div className="droppable-container__name-wrapper">
            <h4 className="droppable-container__name">{name}</h4>
          </div>
          <Divider style={{ margin: "7px 0" }} />
          {items.map((item: any) => (
            <SortableItem key={item.id} id={item.id} tasks={item} />
          ))}
        </div>
      </SortableContext>
    </>
  );
}
