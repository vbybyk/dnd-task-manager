import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input as AntdInput, Modal, Button, Divider } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../../Components/Common/Input/Input";
import { UploadAvatar } from "../../Components/Common/UploadAvatar/UploadAvatar";
import { useAlertContext } from "../../Context/AlertContext";
import { usePopupContext } from "../../Context/PopupContext";
import { requiredFieldMessage } from "../../Components/Common/Constants/Constants";
import { projectActions } from "../../Store/actions/projects";
import { ProjectService } from "../../API/ProjectService";
import { IProject } from "../../Interfaces/tasks";
import { MODAL_TYPE } from "../../Constants/tasks";
import "./CreateProjectModal.scss";

interface IFormInputs {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

interface IProps {
  modal: { open: boolean; type: number };
  setModal: ({ open, type }: { open: boolean; type: number }) => void;
  selectedProject: IProject | null;
  setSelectedProject: (project: IProject | null) => void;
}

const { TextArea } = AntdInput;

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
  const { modal, setModal, selectedProject, setSelectedProject } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAlert } = useAlertContext();
  const { setPopup } = usePopupContext();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<IFormInputs>({
    defaultValues: {
      id: undefined,
      name: "",
      description: "",
      imageUrl: "",
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    if (selectedProject) {
      setValue("id", selectedProject?.id);
      setValue("name", selectedProject?.name || "");
      setValue("description", selectedProject?.description || "");
      setValue("imageUrl", selectedProject?.imageUrl || "");
    }
  }, [selectedProject]);

  const onClose = () => {
    setModal({ open: false, type: MODAL_TYPE.CREATE });
    setSelectedProject(null);
    setIsSubmitting(false);
    reset();
  };

  const onSubmit = async (data: IFormInputs) => {
    try {
      setIsSubmitting(true);
      if (modal.type === MODAL_TYPE.CREATE) {
        const res = await ProjectService.createProject(data);
        const newProject: IProject = res.data;
        dispatch(projectActions.addProject(newProject));
        setAlert({ type: "success", message: "Project created successfully!" });
        onClose();
      }
      if (modal.type === MODAL_TYPE.EDIT) {
        const res = await ProjectService.updateProject(data);
        const updatedProject: IProject = res.data;
        dispatch(projectActions.updateProject(updatedProject));
        setAlert({ type: "success", message: "Project updated successfully!" });
        onClose();
      }
    } catch (error) {
      console.error(error);
      modal.type === MODAL_TYPE.CREATE && setAlert({ type: "error", message: "Could not create project" });
      modal.type === MODAL_TYPE.EDIT && setAlert({ type: "error", message: "Could not update project" });
      setIsSubmitting(false);
    }
  };

  const onDelete = async () => {
    setIsSubmitting(true);
    if (selectedProject) {
      try {
        await ProjectService.deleteProject(selectedProject.id);
        dispatch(projectActions.deleteProject(selectedProject.id));
        setAlert({ type: "success", message: "Project deleted successfully!" });
        setModal({ open: false, type: MODAL_TYPE.CREATE });
        setSelectedProject(null);
        setIsSubmitting(false);
      } catch (err) {
        setAlert({ type: "error", message: "Something went wrong!" });
        console.log(err);
        setIsSubmitting(false);
      }
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
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              field={field}
              label="Project name"
              htmlFor="name"
              id="name"
              required
              placeholder="Project name"
              error={error}
              style={{ marginBottom: "20px" }}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div className="Input" style={{ marginBottom: "20px" }}>
              <label className="input-label required" htmlFor="description">
                Description
              </label>
              <TextArea
                placeholder="Describe your project"
                autoSize={{ minRows: 3, maxRows: 20 }}
                maxLength={550}
                showCount={true}
                required
                id="description"
                {...field}
              />
              {errors.description?.message && <p className="required-field-message">{errors.description?.message}</p>}
            </div>
          )}
        />
        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <div className="Input" style={{ marginBottom: "20px" }}>
              <label className="input-label">Project image</label>
              <UploadAvatar
                imageUrl={field.value}
                setImageUrl={(url) => setValue("imageUrl", url, { shouldDirty: true })}
                cropAspectRatio={2 / 1}
                type="cover"
              />
            </div>
          )}
        />
        <Divider />
        <div className="new-project-modal__buttons-wrapper">
          <div className="new-task-modal__buttons-wrapper__left">
            {selectedProject && (
              <Button
                type="primary"
                danger
                onClick={() =>
                  setPopup({
                    open: true,
                    title: "Delete project",
                    content: "Are you sure you want to delete this project?",
                    buttons: [{ text: "Delete", type: "primary", danger: true, onClick: onDelete }],
                  })
                }
                disabled={isSubmitting}
              >
                Delete
              </Button>
            )}
          </div>
          <div className="new-project-modal__buttons-wrapper__right">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="primary"
              onClick={handleSubmit(onSubmit)}
              style={{ marginLeft: "20px" }}
              disabled={!isDirty || !isValid}
              loading={isSubmitting}
            >
              {modal.type === MODAL_TYPE.CREATE ? "Create" : "Edit"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
