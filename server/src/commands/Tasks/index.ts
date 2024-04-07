import { TaskModel } from "../../models/TaskSchema";
import { Task } from "../../models/TaskSchema";

// Function to update tasks
// async function updateTasks(
//   taskId: Task["id"],
//   projectId: Task["projectId"],
//   containerId: Task["containerId"],
//   sortId: Task["sortId"]
// ): Promise<void> {
//   try {
//     await TaskModel.updateMany(
//       { taskId: taskId, projectId: projectId, containerId: containerId },
//       { $set: { sortId: sortId } }
//     );
//     console.log("Tasks updated successfully");
//   } catch (err) {
//     console.error("Error updating tasks:", err);
//   }
// }

//need to try this way

type TaskUpdate = {
  id: Task["id"];
  sortId: Task["sortId"];
  containerId: Task["containerId"];
};

async function updateTasks(projectId: string, taskUpdates: TaskUpdate[]): Promise<void> {
  console.log("tasks", taskUpdates);
  try {
    const promises = taskUpdates.map(taskUpdate => {
      return TaskModel.updateOne(
        { id: taskUpdate.id, projectId },
        { $set: { sortId: taskUpdate.sortId, containerId: taskUpdate.containerId } }
      );
    });
    await Promise.all(promises);
    console.log("Tasks updated successfully");
  } catch (err) {
    console.error("Error updating tasks:", err);
  }
}

export { updateTasks };
