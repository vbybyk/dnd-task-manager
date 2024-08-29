import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { ProjectService } from "../API/ProjectService";
import { TasksService } from "../API/TasksService";
import { ContainersService } from "../API/ContainersService";
import { LabelsService } from "../API/LabelsService";
import { projectActions } from "../Store/actions/projects";
import { containersActions } from "../Store/actions/containers";
import { tasksActions } from "../Store/actions/tasks";
import { labelsActions } from "../Store/actions/labels";

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
      await TasksService.updateProjectTasks(projId, tasks);
    } catch (err) {
      //@ts-ignore
      dispatch(tasksActions.updateTasksError(err));
      console.log(err);
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

  const getLabels = async (projId: number) => {
    try {
      dispatch(labelsActions.getLabelsRequest());
      const { status, data } = await LabelsService.getProjectLabels(projId);
      status === 200 && dispatch(labelsActions.getLabelsSuccess(data));
    } catch (err) {
      //@ts-ignore
      dispatch(labelsActions.getLabelsError(err));
      console.log(err);
    }
  };

  const resetProject = () => {
    dispatch(tasksActions.getTasksSuccess([]));
    dispatch(containersActions.getContainersSuccess([]));
  };

  return {
    getProjects,
    updateProjectTasks,
    getProjectById,
    getProjectTasks,
    getProjectContainers,
    getLabels,
    resetProject,
  };
};
export default useTasks;
