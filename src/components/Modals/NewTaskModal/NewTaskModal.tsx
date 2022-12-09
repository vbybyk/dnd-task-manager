import { Input, Modal, Button, Divider } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./newTaskModal.scss";

interface IFormInputs {
  name: string;
  description: string;
  label: string;
  priority: string;
}

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const { TextArea } = Input;

const schema = yup
  .object({
    name: yup.string().max(50).required(),
    description: yup.string().max(150).required(),
  })
  .required();

export const NewTaskModal = (props: IProps) => {
  const { isModalOpen, setIsModalOpen } = props;
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      name: "",
      description: "",
      label: "",
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

  const onSubmit = (data: IFormInputs) => {
    console.log(data);
    setIsModalOpen(false);
    setTimeout(() => {
      reset();
    }, 500);
  };

  return (
    <Modal title="New Task" open={isModalOpen} className="new-task-modal" onCancel={handleCancel} footer={null}>
      <form onSubmit={handleSubmit(onSubmit)} className="new-task-modal__form">
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input placeholder="Task name CONTROLLER" style={{ width: 200 }} {...field} />}
        />
        {/* <Input placeholder="Task name" style={{ width: 200 }} {...register("name")} /> */}
        <p>{errors.name?.message}</p>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              placeholder="Autosize height with minimum and maximum number of lines"
              autoSize={{ minRows: 2, maxRows: 2 }}
              {...field}
            />
          )}
        />
        {/* <TextArea
          placeholder="Autosize height with minimum and maximum number of lines"
          autoSize={{ minRows: 2, maxRows: 6 }}
          {...register("description")}
        /> */}
        <p>{errors.description?.message}</p>

        <Input placeholder="Label" style={{ width: 150 }} {...register("label")} />
        <Input placeholder="Priority" style={{ width: 150 }} {...register("priority")} />

        <Divider />
        <div className="new-task-modal__buttons-wrapper">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        </div>
      </form>
    </Modal>
  );
};
