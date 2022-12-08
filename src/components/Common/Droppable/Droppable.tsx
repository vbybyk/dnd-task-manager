import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { SortableItem } from "../SortableItem/SortableItem";
import "./droppable.scss";

export function Droppable(props: any) {
  const { id, items, name } = props;
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <>
      <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        {/* @ts-ignore */}
        <div className="droppable-container" ref={setNodeRef}>
          {name}
          {items.map((item: any) => (
            <SortableItem key={item.id} id={item.id} tasks={item} />
          ))}
        </div>
      </SortableContext>
    </>
  );
}
