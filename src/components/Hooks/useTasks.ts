import { useState } from "react";
import { ProjectService } from "../API/ProjectService";

const useTasks = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState();
  const [isProjectsFetching, setIsProjectsFetching] = useState(false);
  const [isProjectFetching, setIsProjectFetching] = useState(false);

  const getProjects = async () => {
    try {
      setIsProjectsFetching(true);
      const { status, data } = await ProjectService.getProjects();
      status === 200 && setProjects(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsProjectsFetching(false);
    }
  };

  const getProjectById = async (projId: number) => {
    try {
      setIsProjectFetching(true);
      const { status, data } = await ProjectService.getProjectById(projId);
      status === 200 && setProject(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsProjectFetching(false);
    }
  };

  const updateProjectTasks = async (projId: number, tasks: any) => {
    try {
      console.log("trying to put ", tasks);
      await ProjectService.updateProjectTasks(projId, tasks);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("PROJECT UPDATED");
    }
  };

  return { project, projects, getProjects, getProjectById, updateProjectTasks };
};
export default useTasks;
