import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Modal, Button, Divider } from "antd";
import { Input } from "../../Components/Common/Input/Input";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlertContext } from "../../Context/AlertContext";
import { requiredFieldMessage } from "../../Components/Common/Constants/Constants";
import { ContainersService } from "../../API/ContainersService";
import { containersActions } from "../../Store/actions/containers";
import "./CreateSectionModal.scss";

interface IFormInputs {
  id: number;
  name: string;
  projectId: number;
}

interface IProps {
  projectId: number;
  open: boolean;
  setModal: (value: boolean) => void;
}

const schema = yup
  .object({
    name: yup
      .string()
      .min(2, "Please, add at least 2 symbols")
      .max(150, "Please, make it shorter than 50 symbols")
      .required(requiredFieldMessage),
  })
  .required();

export const CreateSectionModal = (props: IProps) => {
  const { projectId, open, setModal } = props;
  const { setAlert } = useAlertContext();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<IFormInputs>({
    defaultValues: {
      id: undefined,
      name: "",
      projectId,
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      await ContainersService.addNewContainer(data);
      dispatch(containersActions.addContainer(data));
      setAlert({ type: "success", message: "Section added successfully!" });
      setModal(false);
    } catch (error) {
      console.error(error);
      setAlert({ type: "error", message: "Failed to add new section" });
    }
  };

  return (
    <Modal
      title={"Add new Section"}
      open={open}
      className="new-section-modal"
      onCancel={() => setModal(false)}
      width={700}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="new-section-modal__form">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              placeholder="Section name"
              field={field}
              label="Section name"
              htmlFor="name"
              required
              error={error}
            />
          )}
        />
        <Divider />
        <div className="new-section-modal__buttons-wrapper">
          <div className="new-section-modal__buttons-wrapper__right">
            <Button onClick={() => setModal(false)}>Cancel</Button>
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
      </form>
    </Modal>
  );
};
