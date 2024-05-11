import { Application } from "express";
import { ProjectModel } from "../models/ProjectSchema";
import { ContainerModel } from "../models/ContainerSchema";

export const attachProjectRoutes = (app: Application) => {
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

  app.put("/projects/:id", async (_req, res) => {
    const id = _req.params.id;
    try {
      const updatedProject = await ProjectModel.findOneAndUpdate({ id }, _req.body, { returnOriginal: false });
      res.json(updatedProject);
    } catch (error) {
      throw new Error(`Failed to query project: ${error}`);
    }
  });

  app.post("/projects/create", async (req, res) => {
    try {
      const count = await ProjectModel.countDocuments({});
      const newProject = new ProjectModel({
        ...req.body,
        id: count + 1,
      });
      await newProject.save();
      await ContainerModel.create({ projectId: newProject.id, id: 1, name: "TO DO" });

      res.json(newProject);
    } catch (error) {
      throw new Error(`Failed to create project: ${error}`);
    }
  });
};
