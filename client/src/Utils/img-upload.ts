import { TasksService } from "../API/TasksService";
import { UsersService } from "../API/UsersService";

export const uploadTaskImage = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { status, data } = await TasksService.uploadImage(formData);
    if (status === 200) {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const uploadUserImage = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { status, data } = await UsersService.uploadImage(formData);
    if (status === 200) {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};
