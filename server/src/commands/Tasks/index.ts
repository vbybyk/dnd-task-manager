import { TaskModel } from "../../models/TaskSchema";
import { Task } from "../../models/TaskSchema";

type TaskUpdate = {
  id: Task["id"];
  sortId: Task["sortId"];
  containerId: Task["containerId"];
};

async function updateTasks(projectId: string, taskUpdates: TaskUpdate[]): Promise<Task[]> {
  const promises = taskUpdates.map(taskUpdate => {
    return TaskModel.updateOne(
      { id: taskUpdate.id, projectId },
      { $set: { sortId: taskUpdate.sortId, containerId: taskUpdate.containerId } }
    );
  });
  await Promise.all(promises);

  const updatedTasks = await TaskModel.find({ projectId });
  return updatedTasks;
}

export { updateTasks };
