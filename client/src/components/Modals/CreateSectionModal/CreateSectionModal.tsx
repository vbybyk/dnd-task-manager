// import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Input, Modal, Button, Divider } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { requiredFieldMessage } from "../../Common/Constants/Constants";
import { ContainersService } from "../../API/ContainersService";
import { containersActions } from "../../store/actions/containers";
import { alertActions } from "../../store/actions/alert";
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
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      id: undefined,
      name: "",
      projectId,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      await ContainersService.addNewContainer(data);
      dispatch(containersActions.addContainer(data));
      setModal(false);
      dispatch(alertActions.success("Section added successfully!"));
    } catch (error) {
      console.error(error);
      dispatch(alertActions.error("Something went wrong"));
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
        <p className="input-field-title">Section name</p>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input placeholder="Section name" {...field} />}
        />
        <p className="required-field-message">{errors.name?.message}</p>
        <Divider />
        <div className="new-section-modal__buttons-wrapper">
          <div className="new-section-modal__buttons-wrapper__right">
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
