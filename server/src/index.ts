import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Application } from "express";
import mongoose from "mongoose";
import { ProjectModel } from "./models/ProjectSchema";
import { TaskModel } from "./models/TaskSchema";
import { updateTasks } from "./commands/Tasks";

const port = process.env.PORT || 9000;
const user = process.env.DB_USER;
const userPassword = process.env.DB_USER_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const dbName = process.env.DB_NAME;

const mount = async (app: Application) => {
  app.use(cors());
  app.use(express.json());

  await mongoose.connect(
    `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`
  );

  app.get("/projects", async (_req, res) => {
    await ProjectModel.find({}, (err: any, data: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }).clone();
  });

  app.get("/projects/:id", async (_req, res) => {
    await ProjectModel.find({ id: _req.params.id }, (err: any, data: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }).clone();
  });

  app.put("/projects/:id/name", async (_req, res) => {
    const newName = "Project ONE NAME 2";
    const id = _req.params.id;
    // try {
    //   await ProjectModel.findOneAndUpdate( id, { name: newName }, { returnOriginal: false }).then(() => {
    //     res.send("updated");
    //   });
    // } catch (error) {
    //   throw new Error(`Failed to query project: ${error}`);
    // }
    try {
      await ProjectModel.findOneAndUpdate({ id }, { name: newName }, (err: any, data: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      }).clone();
    } catch (error) {
      throw new Error(`Failed to query project: ${error}`);
    }
    // res.send("Updated");
  });

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

  app.put("/tasks/update", async (req, res) => {
    const { taskId, projectId, containerId, sortId } = req.body;
    try {
      await updateTasks(taskId, projectId, containerId, sortId);
      res.send("Tasks updated successfully");
    } catch (err) {
      res.status(500).send(`Error updating tasks: ${err}`);
    }
  });

  // const startServer = async () => {
  //   await server.start();
  //   server.applyMiddleware({ app, path: "/api" });
  // };
  // startServer();
  app.listen(port);
  console.log(`App is listening on port ${port}`);

  // console.log(`App is listening on port ${process.env.PORT}`)
};

mount(express());
