import { TasksService } from "../API/TasksService";

export const uploadImage = async (file: any) => {
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
