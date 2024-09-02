import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { UsersService } from "../API/UsersService";
import { usersActions } from "../Store/actions/users";

const useUsers = () => {
  const dispatch: Dispatch = useDispatch();

  const getUser = async (userId: number) => {
    try {
      dispatch(usersActions.getUserRequest());
      const { status, data } = await UsersService.getUser(userId);
      status === 200 && dispatch(usersActions.getUserSuccess(data));
    } catch (err) {
      //@ts-ignore
      dispatch(usersActions.getUserError(err));
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      dispatch(usersActions.getUsersRequest());
      const { status, data } = await UsersService.getUsers();
      status === 200 && dispatch(usersActions.getUsersSuccess(data));
    } catch (err) {
      //@ts-ignore
      dispatch(usersActions.getUsersError(err));
      console.log(err);
    }
  };

  return { getUser, getUsers };
};

export default useUsers;
