import { Application } from "express";
import { TaskModel } from "../models/TaskSchema";
import { updateTasks } from "../commands/Tasks";

export const attachTaskRoutes = (app: Application) => {
  app.post("/tasks/create", async (req, res) => {
    try {
      const tasks = await TaskModel.find({ containerId: 1, projectId: req.body.projectId });

      tasks.sort((a, b) => a.sortId - b.sortId);

      const lastSortId = tasks.length > 0 ? tasks[tasks.length - 1].sortId : 0;

      const newSortId = lastSortId + 1;

      const newTask = await TaskModel.create({ ...req.body, sortId: newSortId });

      res.json(newTask);
    } catch (err) {
      res.status(500).send(`Error creating task: ${err}`);
    }
  });

  app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedTask = await TaskModel.findOneAndUpdate({ id }, req.body, { returnOriginal: false });
      res.json(updatedTask);
    } catch (err) {
      res.status(500).send(`Error updating task: ${err}`);
    }
  });

  app.delete("/tasks/:id", async (req, res) => {
    try {
      await TaskModel.findOneAndDelete({ id: req.params.id });
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
};
