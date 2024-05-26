// import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Input, Modal, Button, Divider } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { requiredFieldMessage } from "../../Components/Common/Constants/Constants";
import { projectActions } from "../../Store/actions/projects";
import { ProjectService } from "../../API/ProjectService";
import { IProject } from "../../Interfaces/tasks";
import { alertActions } from "../../Store/actions/alert";
import { MODAL_TYPE } from "../../Constants/tasks";
import { useEffect } from "react";

interface IFormInputs {
  id: number;
  name: string;
  description: string;
}

interface IProps {
  modal: { open: boolean; type: number };
  setModal: ({ open, type }: { open: boolean; type: number }) => void;
  selectedProject: IProject | null;
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
  const { modal, setModal, selectedProject } = props;
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      id: undefined,
      name: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (selectedProject) {
      setValue("id", selectedProject?.id);
      setValue("name", selectedProject?.name || "");
      setValue("description", selectedProject?.description || "");
    }
  }, [selectedProject]);

  const onSubmit = async (data: IFormInputs) => {
    try {
      if (modal.type === MODAL_TYPE.CREATE) {
        const res = await ProjectService.createProject(data);
        const newProject: IProject = res.data;
        dispatch(projectActions.addProject(newProject));
        setModal({ open: false, type: MODAL_TYPE.CREATE });
        dispatch(alertActions.success("Project created successfully!"));
      }
      if (modal.type === MODAL_TYPE.EDIT) {
        const res = await ProjectService.updateProject(data);
        const updatedProject: IProject = res.data;
        dispatch(projectActions.updateProject(updatedProject));
        setModal({ open: false, type: MODAL_TYPE.CREATE });
        dispatch(alertActions.success("Project updated successfully!"));
      }
    } catch (error) {
      console.error(error);
      modal.type === MODAL_TYPE.CREATE && dispatch(alertActions.error("Could not create project"));
      modal.type === MODAL_TYPE.EDIT && dispatch(alertActions.error("Could not update project"));
    }
  };

  return (
    <Modal
      title={modal.type === MODAL_TYPE.CREATE ? "Create new project" : "Edit project"}
      open={modal.open}
      className="new-project-modal"
      onCancel={() => setModal({ open: false, type: MODAL_TYPE.CREATE })}
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
            <Button onClick={() => setModal({ open: false, type: MODAL_TYPE.CREATE })}>Cancel</Button>
            <Button type="primary" onClick={handleSubmit(onSubmit)} style={{ marginLeft: "20px" }}>
              {modal.type === MODAL_TYPE.CREATE ? "Create" : "Edit"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
