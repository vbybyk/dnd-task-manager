import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { Input, Modal, Button, Divider, Select, Tag } from "antd";
import { CheckSquareTwoTone, EditOutlined } from "@ant-design/icons";
import TextEditor from "../../Components/Common/TextEditor/TextEditor";
import { LabelsPopover } from "../../Components/LabelsPopover/LabelsPopover";
import { yupResolver } from "@hookform/resolvers/yup";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { requiredFieldMessage } from "../../Components/Common/Constants/Constants";
import { TasksService } from "../../API/TasksService";
import { tasksActions } from "../../Store/actions/tasks";
import { ITask, IContainer, ILabel } from "../../Interfaces/tasks";
import { IState } from "../../Store/reducers";
import { MODAL_TYPE } from "../../Constants/tasks";
import { useAlertContext } from "../../Context/AlertContext";
import { uploadTaskImage } from "../../Utils/img-upload";
import "./newTaskModal.scss";

interface IFormInputs {
  id?: number;
  name: string;
  description?: string;
  labels?: { value: number; label: string }[];
  priority: string;
  containerId: number;
  images?: string[];
}

interface IModal {
  open: boolean;
  type: number;
}

interface IProps {
  selectedTask: ITask | null;
  projectId: number;
  modal: IModal;
  setModal: ({ open, type }: IModal) => void;
  type?: number;
  setSelectedTask: (task: ITask | null) => void;
}

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const schema = yup
  .object({
    name: yup
      .string()
      .min(2, "Please, add at least 2 symbols")
      .max(150, "Please, make it shorter than 50 symbols")
      .required(requiredFieldMessage),
  })
  .required();

const tagRender = (props: CustomTagProps & { labelsDict: Record<string, any> }) => {
  const { label, value: id, closable, onClose, labelsDict } = props;
  const { value: color, color: fontColor } = labelsDict[id] || {};
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      key={id}
      color={color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3, color: fontColor }}
    >
      {label}
    </Tag>
  );
};

export const NewTaskModal = (props: IProps) => {
  const { projectId, modal, setModal, selectedTask, setSelectedTask } = props;
  const { containers } = useSelector((state: IState) => state.containers);
  const { labels } = useSelector((state: IState) => state.labels);
  const { setAlert } = useAlertContext();
  const dispatch = useDispatch();

  const [isOpenLabelsModal, setIsOpenLabelsModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const containersOptions = containers.map((container: IContainer) => ({ value: container.id, label: container.name }));

  const isNewTask = modal.type === MODAL_TYPE.CREATE;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormInputs>({
    defaultValues: {
      id: undefined,
      name: "",
      description: "",
      labels: [],
      priority: "",
      containerId: containersOptions[0].value,
      images: [],
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    if (selectedTask) {
      setValue("id", selectedTask.id);
      setValue("name", selectedTask.name);
      setValue("description", selectedTask.description);
      setValue(
        "labels",
        selectedTask.labels?.map(({ id, label }) => ({ value: id, label }))
      );
      setValue("priority", selectedTask.priority);
      setValue("containerId", selectedTask.containerId);
      if (!!selectedTask?.images?.length) {
        setValue("images", selectedTask.images);
      }
    }
  }, [selectedTask]);

  const labelsDict = useMemo(() => {
    const dict: Record<number, ILabel> = {};
    labels.forEach((label: ILabel) => {
      dict[label.id] = label;
    });
    return dict;
  }, [labels]);

  const onClose = () => {
    setModal({ open: false, type: MODAL_TYPE.CREATE });
    setSelectedTask(null);
    setTimeout(() => reset(), 500);
  };

  const onSubmit = async (data: any) => {
    try {
      if (isNewTask) {
        const task: ITask = {
          ...data,
          id: Date.now(),
          projectId,
          containerId: data.containerId,
          labels: labels?.filter((label) => data.labels?.find((l: any) => l.value === label.id)) || [],
        };
        const res = await TasksService.addNewTask(task);
        dispatch(tasksActions.setNewTask(res.data));
        setAlert({ type: "success", message: "Task created successfully!" });
        onClose();
      } else {
        const res = await TasksService.updateTask(data.id, {
          ...data,
          labels: labels?.filter((label) => data.labels?.find((l: any) => l.value === label.id)) || [],
        });
        dispatch(tasksActions.setTask(res.data));
        setAlert({ type: "success", message: "Updated successfully!" });
        onClose();
      }
    } catch (err) {
      setAlert({ type: "error", message: "Something went wrong!" });
      console.log(err);
    }
  };

  const onDelete = async () => {
    if (selectedTask) {
      try {
        await TasksService.deleteTask(selectedTask.id);
        dispatch(tasksActions.deleteTask(selectedTask.id));
        setAlert({ type: "success", message: "Task deleted successfully!" });
        onClose();
      } catch (err) {
        setAlert({ type: "error", message: "Something went wrong!" });
        console.log(err);
      }
    }
  };

  const handleUpload = async (file: any) => {
    try {
      const url = await uploadTaskImage(file);
      const prevImages: string[] = watch("images") || [];
      setValue("images", [...prevImages, url]);
      return url;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      title={
        isNewTask ? (
          "New Task"
        ) : (
          <div style={{ paddingLeft: "10px" }}>
            <CheckSquareTwoTone twoToneColor="#1890ff" />
            <span> - </span>
            <span style={{ fontSize: "14px", fontWeight: "400" }}>{selectedTask?.id}</span>
          </div>
        )
      }
      open={modal.open}
      className="new-task-modal"
      onCancel={onClose}
      width={1000}
      footer={
        <div className="new-task-modal__buttons-wrapper">
          <div className="new-task-modal__buttons-wrapper__left">
            {selectedTask && (
              <Button type="primary" danger onClick={onDelete}>
                Delete
              </Button>
            )}
          </div>
          <div className="new-task-modal__buttons-wrapper__right">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="primary"
              onClick={handleSubmit(onSubmit)}
              style={{ marginLeft: "20px" }}
              disabled={!isDirty || !isValid}
            >
              Submit
            </Button>
          </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="new-task-modal__form">
        <div className="new-task-modal__left">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Task name"
                {...field}
                className={cn(!isNewTask && "hidden-input")}
                style={{ fontSize: "16px", fontWeight: "600" }}
              />
            )}
          />
          <span className="input-field-title">Description</span>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextEditor
                value={field.value}
                onChange={(value: string) => field.onChange(value)}
                placeholder="Describe your task"
                className={cn("new-task-modal__text-editor", !isNewTask && "hidden-editor", isFocused && "focused")}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                handleUpload={handleUpload}
              />
            )}
          />
        </div>
        <div className="new-task-modal__right">
          <span className="input-field-title">Section</span>
          <Controller
            name="containerId"
            control={control}
            render={({ field }) => <Select options={containersOptions} {...field} />}
          />
          <span className="input-field-title">Priority</span>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => <Select options={priorityOptions} {...field} />}
          />
          <span className="input-field-title">Label</span>
          <div style={{ display: "flex" }}>
            <Controller
              name="labels"
              control={control}
              render={({ field }) => (
                <Select
                  mode="multiple"
                  tagRender={(props) => tagRender({ ...props, labelsDict })}
                  defaultValue={null}
                  options={labels.map(({ id, label }) => ({ value: id, label }))}
                  {...field}
                  optionFilterProp="label"
                  labelInValue
                  style={{ width: "100%" }}
                />
              )}
            />
            <LabelsPopover
              open={isOpenLabelsModal}
              onOpen={setIsOpenLabelsModal}
              placement="bottomRight"
              labels={labels || []}
            >
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenLabelsModal(true);
                }}
                className="icon-button"
                style={{ marginLeft: "10px", width: "42px" }}
              />
            </LabelsPopover>
          </div>
        </div>
      </form>
    </Modal>
  );
};
