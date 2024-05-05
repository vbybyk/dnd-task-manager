import { ProjectService } from "../API/ProjectService";
import { TasksService } from "../API/TasksService";
import { ContainersService } from "../API/ContainersService";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { projectActions } from "../store/actions/projects";
import { containersActions } from "../store/actions/containers";
import { tasksActions } from "../store/actions/tasks";

const useTasks = () => {
  const dispatch: Dispatch = useDispatch();

  const getProjects = async () => {
    try {
      dispatch(projectActions.getProjectsRequest());
      const { status, data } = await ProjectService.getProjects();
      status === 200 && dispatch(projectActions.getProjectsSuccess(data));
    } catch (err) {
      //@ts-ignore
      dispatch(projectActions.getProjectsError(err));
      console.log(err);
    }
  };

  const getProjectById = async (projId: number) => {
    try {
      dispatch(projectActions.getProjectRequest());
      const { status, data } = await ProjectService.getProjectById(projId);
      status === 200 && dispatch(projectActions.getProjectSuccess(data));
    } catch (err) {
      //@ts-ignore
      dispatch(projectActions.getProjectError(err));
      console.log(err);
    }
  };

  const getProjectTasks = async (projId: number) => {
    try {
      dispatch(tasksActions.getTasksRequest());
      const { status, data } = await TasksService.getProjectTasks(projId);
      status === 200 && dispatch(tasksActions.getTasksSuccess(data));
    } catch (err) {
      //@ts-ignore
      dispatch(tasksActions.getTasksError(err));
      console.log(err);
    }
  };

  const updateProjectTasks = async (projId: number, tasks: any) => {
    try {
      dispatch(projectActions.postProjectRequest());
      const { status } = await TasksService.updateProjectTasks(projId, tasks);
      status === 200 && dispatch(projectActions.postProjectSuccess());
    } catch (err) {
      //@ts-ignore
      dispatch(projectActions.postProjectError(err));
      console.log(err);
    } finally {
      console.log("PROJECT UPDATED");
    }
  };

  const getProjectContainers = async (projId: number) => {
    try {
      dispatch(containersActions.getContainersRequest());
      const { status, data } = await ContainersService.getProjectContainers(projId);
      status === 200 && dispatch(containersActions.getContainersSuccess(data));
    } catch (err) {
      //@ts-ignore
      dispatch(containersActions.getContainersError(err));
      console.log(err);
    }
  };

  return { getProjects, updateProjectTasks, getProjectById, getProjectTasks, getProjectContainers };
};
export default useTasks;
