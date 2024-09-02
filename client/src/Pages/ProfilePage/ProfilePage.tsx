import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Layout, Button, Input as InputAntd } from "antd";
import { Input } from "../../Components/Common/Input/Input";
import { UploadAvatar } from "../../Components/Common/UploadAvatar/UploadAvatar";
import useUsers from "../../Hooks/useUsers";
import { useAlertContext } from "../../Context/AlertContext";
import { requiredFieldMessage } from "../../Components/Common/Constants/Constants";
import { usersActions } from "../../Store/actions/users";
import { IUser } from "../../Interfaces/tasks";
import "./ProfilePage.scss";

interface IUserForm {
  id: number | null;
  name: string;
  email: string;
  profileImage: string;
  job_title: string;
  phone: string;
  team: string;
  about: string;
  location: string;
}

const schema = yup
  .object({
    name: yup
      .string()
      .min(2, "Please, add at least 2 symbols")
      .max(150, "Please, make it shorter than 50 symbols")
      .required(requiredFieldMessage),
    email: yup.string().email("Invalid email").required(requiredFieldMessage),
    profileImage: yup.string().url("Invalid URL"),
  })
  .required();

const { Content } = Layout;
const { TextArea } = InputAntd;

export const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { getUser } = useUsers();
  const { setAlert } = useAlertContext();
  const { user } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<IUserForm>({
    defaultValues: {
      id: null,
      name: "",
      email: "",
      profileImage: "",
      job_title: "",
      phone: "",
      team: "",
      about: "",
      location: "",
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    if (userId && user?.id !== +userId) {
      getUser(+userId);
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      setValue("id", user.id);
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("profileImage", user.profileImage || "");
      setValue("job_title", user.job_title || "");
      setValue("phone", user.phone || "");
      setValue("team", user.team || "");
      setValue("about", user.about || "");
      setValue("location", user.location || "");
    }
  }, [user]);

  const onUpdateImage = (url: string) => {
    setValue("profileImage", url);
    dispatch(usersActions.setUser({ ...user, profileImage: url }));
    setAlert({ type: "success", message: "Image updated successfully!" });
  };

  const onSubmit = (data: IUserForm) => {
    dispatch(usersActions.setUser(data as IUser));
    setAlert({ type: "success", message: "Updated successfully!" });
    reset();
  };

  const userName = watch("name");

  return (
    <Content className="ProfilePage">
      <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
        <div className="avatar-wrapper">
          <Controller
            name="profileImage"
            control={control}
            render={({ field }) => <UploadAvatar imageUrl={field.value} setImageUrl={onUpdateImage} type="avatar" />}
          />
          <h2>{userName}</h2>
        </div>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input field={field} label="Name" htmlFor="name" required error={error} />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input field={field} label="Email" htmlFor="email" required error={error} disabled />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input field={field} label="Phone" htmlFor="phone" error={error} />
          )}
        />
        <Controller
          name="job_title"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input field={field} label="Job title" htmlFor="job_title" error={error} />
          )}
        />
        <Controller
          name="team"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input field={field} label="Team" htmlFor="team" error={error} />
          )}
        />
        <Controller
          name="about"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="Input">
              <label className="input-label">About</label>
              <TextArea autoSize={{ minRows: 3, maxRows: 20 }} maxLength={550} showCount={true} {...field} />
            </div>
          )}
        />
        <Button type="primary" htmlType="submit" className="save-button" disabled={!isDirty || !isValid}>
          Save
        </Button>
      </form>
    </Content>
  );
};
