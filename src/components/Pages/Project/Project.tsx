import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Layout, Button, Checkbox, Menu, Space } from "antd";
import { arrayMove, insertAtIndex, removeAtIndex } from "../../Utils/utils";
import useTasks from "../../Hooks/useTasks";
import { Item } from "../../Common/Item/Item";
import { Droppable } from "../../Common/Droppable/Droppable";
import { ITask } from "../../Interfaces/tasks";
import "./project.scss";

const { Content } = Layout;
type Params = {
  projId: string;
};

export const Project: React.FC = () => {
  const [items, setItems] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [activeItem, setActiveItem] = useState<ITask | undefined>(undefined);

  const { getProjects, updateProjectTasks, getProjectById } = useTasks();
  const { project, isFetching } = useSelector((state: any) => state);
  const { projId } = useParams<Params>() as Params;

  useEffect(() => {
    getProjectById(+projId);
  }, []);

  useEffect(() => {
    // @ts-ignore
    !items && setItems(project?.containers);
  }, [project]);

  useEffect(() => {
    getProjectById(+projId);
    // @ts-ignore
    setItems(project?.containers);
  }, [projId]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: { active: any }) => {
    const activeContainer = active.data.current.sortable.containerId;
    // @ts-ignore
    setActiveItem(items[activeContainer].filter((elem) => elem.id === active.id)[0]);
    setActiveId(active.id);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setActiveItem(undefined);
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
      setActiveItem(undefined);
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
    updateProjectTasks(+projId, items);
    setActiveId(null);
    setActiveItem(undefined);
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
        <DragOverlay>{activeId ? <Item id={activeId} tasks={activeItem} dragOverlay /> : null}</DragOverlay>
      </DndContext>
    </Content>
  );
};
