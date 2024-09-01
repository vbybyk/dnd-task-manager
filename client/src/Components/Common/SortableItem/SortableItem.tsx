import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Item } from "../Item/Item";

export const SortableItem = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition || "",
    opacity: isDragging ? 0.5 : 1,
    width: "100%",
  };

  return (
    <div id={props.id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item task={props.task} onClickTask={props.onClickTask} />
    </div>
  );
};
