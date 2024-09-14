import { Application } from "express";
import multer from "multer";
import { TaskModel } from "../models/TaskSchema";
import { updateTasks } from "../commands/Tasks";
import { uploadImage } from "../commands/ImgUpload";

export const attachTaskRoutes = (app: Application) => {
  app.post("/projects/:projectId/task", async (req, res) => {
    const { projectId } = req.params;
    try {
      const tasks = await TaskModel.find({ containerId: 1, projectId });
      tasks.sort((a, b) => a.sortId - b.sortId);
      const lastSortId = tasks.length > 0 ? tasks[tasks.length - 1].sortId : 0;
      const newSortId = lastSortId + 1;

      const allTasks = await TaskModel.find({ projectId });
      const lastTaskId = allTasks.length > 0 ? allTasks[allTasks.length - 1].id : 0;
      const newTaskId = lastTaskId + 1;

      const newTask = await TaskModel.create({ ...req.body, projectId, id: newTaskId, sortId: newSortId });

      res.json(newTask);
    } catch (err) {
      res.status(500).send(`Error creating task: ${err}`);
    }
  });

  app.put("/projects/:projectId/tasks/:id", async (req, res) => {
    const { id, projectId } = req.params;
    try {
      const updatedTask = await TaskModel.findOneAndUpdate({ id, projectId }, req.body, {
        returnOriginal: false,
      });
      if (!updatedTask) {
        return res.status(404).send("Task not found.");
      }
      res.json(updatedTask);
    } catch (err) {
      res.status(500).send(`Error updating task: ${err}`);
    }
  });

  app.delete("/projects/:projectId/tasks/:id", async (req, res) => {
    try {
      const task = await TaskModel.findOneAndDelete({ id: req.params.id, projectId: req.params.projectId });
      if (!task) {
        return res.status(404).send("No task found to delete");
      }
      res.send("Task deleted");
    } catch (err) {
      res.status(500).send(`Error deleting task: ${err}`);
    }
  });

  app.put("/projects/:id/tasks", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedTasks = await updateTasks(id, req.body);
      res.json({ data: updatedTasks });
    } catch (err) {
      res.status(500).send(`Error updating tasks: ${err}`);
    }
  });

  app.get("/projects/:id/tasks", async (_req, res) => {
    try {
      const tasks = await TaskModel.find({ projectId: _req.params.id });
      res.send(tasks);
    } catch (err) {
      res.status(500).send(`Error getting tasks: ${err}`);
    }
  });

  app.post("/tasks/upload-image", multer().single("file"), async (req, res) => {
    try {
      const result = await uploadImage(req.file?.buffer, "tasks");
      res.json(result);
    } catch (err) {
      res.status(500).send(`Error uploading image: ${err}`);
    }
  });
};
