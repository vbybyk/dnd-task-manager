import { ProjectService } from "../API/ProjectService";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import {
  getProjectsRequest,
  getProjectsSuccess,
  getProjectsError,
  postProjectRequest,
  postProjectSuccess,
  postProjectError,
  getProjectRequest,
  getProjectSuccess,
  getProjectError,
} from "../store/actions";

const useTasks = () => {
  const dispatch: Dispatch = useDispatch();

  const getProjects = async () => {
    try {
      dispatch(getProjectsRequest());
      const { status, data } = await ProjectService.getProjects();
      status === 200 && dispatch(getProjectsSuccess(data));
    } catch (err) {
      //@ts-ignore
      dispatch(getProjectsError(err));
      console.log(err);
    }
  };

  const getProjectById = async (projId: number) => {
    try {
      dispatch(getProjectRequest());
      const { status, data } = await ProjectService.getProjectById(projId);
      status === 200 && dispatch(getProjectSuccess(data));
    } catch (err) {
      //@ts-ignore
      dispatch(getProjectError(err));
      console.log(err);
    }
  };

  const updateProjectTasks = async (projId: number, tasks: any) => {
    try {
      console.log("trying to put ", tasks);
      dispatch(postProjectRequest());
      const { status } = await ProjectService.updateProjectTasks(projId, tasks);
      status === 200 && dispatch(postProjectSuccess());
    } catch (err) {
      //@ts-ignore
      dispatch(postProjectError(err));
      console.log(err);
    } finally {
      console.log("PROJECT UPDATED");
    }
  };

  return { getProjects, updateProjectTasks, getProjectById };
};
export default useTasks;
