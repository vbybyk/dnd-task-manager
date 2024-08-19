import Axios from "axios";
import { BACKEND_URL } from "../config";

export class UsersService {
  static getUser = async (userId: number) => await Axios.get(`${BACKEND_URL}/current/${userId}`);
  static getUsers = async () => await Axios.get(`${BACKEND_URL}/users`);
  static addUser = async (user: any) => await Axios.post(`${BACKEND_URL}/users`, user);
  static updateUser = async (user: any) => await Axios.put(`${BACKEND_URL}/users/${user.id}`, user);
  static deleteUser = async (userId: number) => await Axios.delete(`${BACKEND_URL}/users/${userId}`);
  static uploadImage = async (formData: FormData) =>
    await Axios.post(`${BACKEND_URL}/users/upload-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
}
