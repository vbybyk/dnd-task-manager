import { useState, useEffect, Fragment } from "react";
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
import { Layout, Row, Col, Button, Spin } from "antd";
import useTasks from "../../Hooks/useTasks";
import { Item } from "../../Common/Item/Item";
import { Droppable } from "../../Common/Droppable/Droppable";
import { NewTaskModal } from "../../Modals/NewTaskModal/NewTaskModal";
import { CreateSectionModal } from "../../Modals/CreateSectionModal/CreateSectionModal";
import { IContainer, ITask } from "../../Interfaces/tasks";
import { IState } from "../../store/reducers";
import { arrayMove, moveBetweenContainers } from "../../Utils/dnd";
import { transformData, flattenData } from "../../Utils/project";
import { MODAL_TYPE } from "../../constants/tasks";
import "./project.scss";

const { Content } = Layout;
type Params = {
  projId: string;
};

export const Project: React.FC = () => {
  const [items, setItems] = useState<Record<number, ITask[]>>({});
  const [activeId, setActiveId] = useState(null);
  const [activeItem, setActiveItem] = useState<ITask | undefined>(undefined);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const { updateProjectTasks, getProjectById, getProjectTasks, getProjectContainers, getLabels } = useTasks();
  const { project, isFetching: isProjectLoading } = useSelector((state: IState) => state.project);
  const { tasks, isFetching: isTasksLoading } = useSelector((state: IState) => state.tasks);
  const { containers, isFetching: isContainersLoading } = useSelector((state: IState) => state.containers);
  const { projId } = useParams<Params>() as Params;

  const [taskModal, setTaskModal] = useState({ open: false, type: MODAL_TYPE.CREATE });
  const [newContainerModal, setNewContainerModal] = useState(false);

  const loading = isProjectLoading || isTasksLoading || isContainersLoading;

  useEffect(() => {
    getProjectById(+projId);
    getProjectTasks(+projId);
    getProjectContainers(+projId);
    getLabels(+projId);
  }, [projId]);

  useEffect(() => {
    if (tasks.length && containers.length > 0) {
      const transformedData = transformData(tasks, containers);
      setItems(transformedData);
    }
  }, [tasks, containers, projId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        tolerance: 5,
        delay: 300,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: { active: any }) => {
    const activeContainer = active.data.current.sortable.containerId;

    setActiveItem(items[activeContainer].find((elem) => elem.id === active.id));
    setActiveId(active.id);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setActiveItem(undefined);
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;

    const overId = over?.id;

    if (!overId || !active.data.current || !over.data.current) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
    const activeIndex = active.data.current.sortable.index;

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
        for (let containerId in newItems) {
          newItems[containerId].forEach((item: any, index: number) => {
            item.sortId = index + 1;
            item.containerId = +containerId;
          });
        }
        return newItems;
      });
    }

    updateProjectTasks(+projId, flattenData(items));
    setActiveId(null);
    setActiveItem(undefined);
  };

  const onClickTask = (task: ITask) => {
    setSelectedTask(task);
    setTaskModal({ open: true, type: MODAL_TYPE.EDIT });
  };

  return (
    <Content className="Project-page">
      <div className="Project-page__title">
        {!isProjectLoading && (
          <>
            <h2>{project.name}</h2>
            <Button
              type="primary"
              onClick={() => setTaskModal({ open: true, type: MODAL_TYPE.CREATE })}
              style={{ marginLeft: "40px" }}
            >
              Create Task
            </Button>
          </>
        )}
        {isProjectLoading && <Spin size="small" className="loader" />}
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="tasks-container">
          {!loading && (
            <Row gutter={12}>
              {containers.length > 0 &&
                containers.map((container: IContainer, index: number) => (
                  <Fragment key={container._id}>
                    <Col key={container._id} xs={24} sm={12} md={6}>
                      <Droppable
                        id={container.id}
                        items={items[container.id] || []}
                        name={container.name}
                        activeId={activeId}
                        key={container._id}
                        onClickTask={onClickTask}
                      />
                    </Col>
                    {index + 1 === containers.length && (
                      <Button type="primary" className="add-section-button" onClick={() => setNewContainerModal(true)}>
                        Add section
                      </Button>
                    )}
                  </Fragment>
                ))}
            </Row>
          )}
          {loading && (
            <div className="loader">
              <Spin size="large" />
            </div>
          )}
        </div>
        <DragOverlay>{activeId ? <Item id={activeId} task={activeItem} dragOverlay /> : null}</DragOverlay>
      </DndContext>
      {taskModal.open && (
        <NewTaskModal
          projectId={+projId}
          modal={taskModal}
          setModal={setTaskModal}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
      )}
      {newContainerModal && (
        <CreateSectionModal projectId={+projId} open={newContainerModal} setModal={setNewContainerModal} />
      )}
    </Content>
  );
};
