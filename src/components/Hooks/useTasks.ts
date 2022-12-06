import { ProjectService } from "../API/ProjectService";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import {
  getProjectRequest,
  getProjectsSuccess,
  getProjectsError,
  postProjectRequest,
  postProjectSuccess,
  postProjectError,
} from "../store/actions";

const useTasks = () => {
  const dispatch: Dispatch = useDispatch();

  const getProjects = async () => {
    try {
      dispatch(getProjectRequest());
      const { status, data } = await ProjectService.getProjects();
      status === 200 && dispatch(getProjectsSuccess(data));
    } catch (err) {
      //@ts-ignore
      dispatch(getProjectsError(err));
      console.log(err);
    }
  };

  // const getProjectById = async (projId: number) => {
  //   try {
  //     setIsProjectFetching(true);
  //     const { status, data } = await ProjectService.getProjectById(projId);
  //     status === 200 && setProject(data);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setIsProjectFetching(false);
  //   }
  // };

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

  return { getProjects, updateProjectTasks };
};
export default useTasks;
