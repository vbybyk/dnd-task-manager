import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Item } from "../Item/Item";

export const SortableItem = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    width: "100%",
  };

  return (
    // @ts-ignore
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={props.id} tasks={props.tasks} />
    </div>
  );
};
