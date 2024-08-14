import Axios from "axios";

export class UsersService {
  static getUser = async (userId: number) => await Axios.get(`http://localhost:9000/current/${userId}`);
  static getUsers = async () => await Axios.get(`http://localhost:9000/users`);
  static addUser = async (user: any) => await Axios.post(`http://localhost:9000/users`, user);
  static updateUser = async (user: any) => await Axios.put(`http://localhost:9000/users/${user.id}`, user);
  static deleteUser = async (userId: number) => await Axios.delete(`http://localhost:9000/users/${userId}`);
  static uploadImage = async (formData: FormData) =>
    await Axios.post(`http://localhost:9000/users/upload-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
}
