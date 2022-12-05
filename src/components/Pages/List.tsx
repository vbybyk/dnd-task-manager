import { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  useDroppable,
  useSensor,
  useSensors,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { useSortable, SortableContext, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Layout, Button, Checkbox, Menu, Space } from "antd";
import { arrayMove, insertAtIndex, removeAtIndex } from "../Utils/utils";
import useTasks from "../Hooks/useTasks";
import { Item } from "../Common/Item/Item";
import { Droppable } from "../Common/Droppable/Droppable";
import "./list.scss";

const { Content } = Layout;

const tasks = {
  todo: [
    { id: 1, text: "task 1" },
    { id: 2, text: "task 2" },
    { id: 3, text: "task 3" },
  ],
  progress: [
    { id: 4, text: "task 4" },
    { id: 6, text: "task 6" },
  ],
  done: [],
};

export const List: React.FC = () => {
  const [items, setItems] = useState(null);
  const [activeId, setActiveId] = useState(null);
  // const [projects, setProjects] = useState([])

  const { getProjects, getProjectById, projects, updateProjectTasks } = useTasks();

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    // @ts-ignore
    setItems(projects[0]?.containers);
  }, [projects]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: { active: any }) => {
    setActiveId(active.id);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;

    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
    const activeIndex = active.data.current.sortable.index;
    // @ts-ignore
    const overIndex = over.id in items ? items[overContainer].length + 1 : over.data.current.sortable.index;

    if (activeContainer !== overContainer) {
      setItems((itemGroups: any) => {
        return moveBetweenContainers(
          itemGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          itemGroups[activeContainer][activeIndex]
        );
      });
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      // @ts-ignore
      const overIndex = over.id in items ? items[overContainer].length + 1 : over.data.current.sortable.index;

      setItems((itemGroups: any) => {
        let newItems;

        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(itemGroups[overContainer], activeIndex, overIndex),
          };
        } else {
          newItems = moveBetweenContainers(
            itemGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            itemGroups[activeContainer][activeIndex]
          );
        }
        return newItems;
      });
    }
    console.log("after setting items", items);
    updateProjectTasks(1, items);
    setActiveId(null);
  };

  const moveBetweenContainers = (
    items: any,
    activeContainer: any,
    activeIndex: any,
    overContainer: any,
    overIndex: any,
    item: any
  ) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    };
  };

  return (
    <Content className="list-page">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="tasks-container">
          {items &&
            Object.keys(items).map((group: any) => (
              // @ts-ignore
              <Droppable id={group} items={items[group]} name={group} activeId={activeId} key={group} />
            ))}
        </div>
        <DragOverlay>{activeId ? <Item id={activeId} dragOverlay /> : null}</DragOverlay>
      </DndContext>
    </Content>
  );
};
