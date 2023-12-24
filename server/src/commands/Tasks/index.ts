import { TaskModel } from "../../models/TaskSchema";
import { Task } from "../../models/TaskSchema";

// Function to update tasks
async function updateTasks(
  taskId: Task["id"],
  projectId: Task["projectId"],
  containerId: Task["containerId"],
  sortId: Task["sortId"]
): Promise<void> {
  try {
    await TaskModel.updateMany(
      { taskId: taskId, projectId: projectId, containerId: containerId },
      { $set: { sortId: sortId } }
    );
    console.log("Tasks updated successfully");
  } catch (err) {
    console.error("Error updating tasks:", err);
  }
}

export { updateTasks };
