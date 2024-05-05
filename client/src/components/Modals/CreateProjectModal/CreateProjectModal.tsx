// import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Input, Modal, Button, Divider } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { requiredFieldMessage } from "../../Common/Constants/Constants";
import { projectActions } from "../../store/actions/projects";
import { ProjectService } from "../../API/ProjectService";
import { IProject } from "../../Interfaces/tasks";

interface IFormInputs {
  id: number;
  name: string;
  description: string;
}

interface IProps {
  open: boolean;
  setModal: (value: boolean) => void;
}

const { TextArea } = Input;

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
      .max(550, "Please, make it shorter than 550 symbols"),
  })
  .required();

export const CreateProjectModal = (props: IProps) => {
  const { open, setModal } = props;
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      id: undefined,
      name: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      const res = await ProjectService.createProject(data);
      const newProject: IProject = res.data;
      dispatch(projectActions.addProject(newProject));
      setModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title={"Create new project"}
      open={open}
      className="new-project-modal"
      onCancel={() => setModal(false)}
      width={700}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="new-project-modal__form">
        <p className="input-field-title">Project name</p>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input required placeholder="Project name" {...field} />}
        />
        <p className="required-field-message">{errors.name?.message}</p>
        <p className="input-field-title">Description</p>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              placeholder="Describe your project"
              autoSize={{ minRows: 3, maxRows: 20 }}
              maxLength={550}
              showCount={true}
              required
              {...field}
            />
          )}
        />
        <p className="required-field-message">{errors.description?.message}</p>
        <Divider />
        <div className="new-project-modal__buttons-wrapper">
          <div className="new-project-modal__buttons-wrapper__right">
            <Button onClick={() => setModal(false)}>Cancel</Button>
            <Button type="primary" onClick={handleSubmit(onSubmit)} style={{ marginLeft: "20px" }}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
