import { Input, Modal, Button, Divider, Select, Tag } from "antd";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { requiredFieldMessage } from "../../Common/Constants/Constants";
import { ProjectService } from "../../API/ProjectService";
import { setNewTask as setTask } from "../../store/actions";
import { ITask } from "../../Interfaces/tasks";
import "./newTaskModal.scss";

interface IFormInputs {
  id?: number;
  name: string;
  description?: string;
  label?: { label: string; value: string; key: string }[] | undefined | null;
  priority: string;
}

interface IProps {
  projectId: number;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setNewTask: (newTask: ITask) => void;
}

const { TextArea } = Input;

const labelOptions = [
  { value: "gold", label: "FRONTEND" },
  { value: "lime", label: "DESIGN" },
  { value: "green", label: "BACKEND" },
  { value: "cyan", label: "INVESTIGATE" },
];

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
    description: yup
      .string()
      .min(2, "Please, add at least 2 symbols")
      .max(999, "Please, make it shorter than 1000 symbols")
      .required(requiredFieldMessage),
  })
  .required();

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

export const NewTaskModal = (props: IProps) => {
  const { projectId, isModalOpen, setIsModalOpen, setNewTask } = props;
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      id: undefined,
      name: "",
      description: "",
      label: [],
      priority: "",
    },
    resolver: yupResolver(schema),
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      reset();
    }, 500);
  };

  const addProjectTask = async (task: ITask) => {
    try {
      const res = await ProjectService.addNewProjectTask(task);
      dispatch(setTask(res.data));
    } catch (err) {
      // dispatch(postProjectError(err)); //TODO: add dispatch
      console.log(err);
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
    // @ts-ignore
    data && console.log(data.label[0].label);

    let task: ITask = {
      ...data,
      id: Date.now(),
      projectId,
      containerId: 1,
      // sortId: 1,
      label: [
        {
          label: data.label[0].label,
          value: data.label[0].value,
          key: data.label[0].key,
        },
      ],
    };
    data && addProjectTask(task);
    data && setNewTask(task);

    setIsModalOpen(false);
    setTimeout(() => {
      reset();
    }, 500);
  };

  return (
    <Modal
      title="New Task"
      open={isModalOpen}
      className="new-task-modal"
      onCancel={handleCancel}
      width={700}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="new-task-modal__form">
        <p className="input-field-title">Task name</p>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input placeholder="Task name" {...field} />}
        />
        <p className="required-field-message">{errors.name?.message}</p>

        <p className="input-field-title">Description</p>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              placeholder="Describe your task"
              autoSize={{ minRows: 3, maxRows: 20 }}
              maxLength={1000}
              showCount={true}
              {...field}
            />
          )}
        />
        <p className="required-field-message">{errors.description?.message}</p>

        <p className="input-field-title">Label</p>
        <Controller
          name="label"
          control={control}
          render={({ field }) => (
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              defaultValue={null}
              style={{ width: "100%" }}
              options={labelOptions}
              {...field}
              optionFilterProp="label"
              labelInValue
            />
          )}
        />

        {/* <Input placeholder="Label" style={{ width: 150 }} {...register("label")} /> */}

        <p className="input-field-title">Priority</p>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => <Select showArrow style={{ width: "150px" }} options={priorityOptions} {...field} />}
        />
        {/* <Input placeholder="Priority" style={{ width: 150 }} {...register("priority")} /> */}

        <Divider />
        <div className="new-task-modal__buttons-wrapper">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit(onSubmit)} style={{ marginLeft: "20px" }}>
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};
