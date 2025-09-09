import { Application } from "express";
import { ProjectModel, Project } from "../models/ProjectSchema";
import { ContainerModel } from "../models/ContainerSchema";

export const attachProjectRoutes = (app: Application) => {
  app.get("/projects", async (_req, res) => {
    await ProjectModel.find({}, (err: any, data: Project[]) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data?.sort((a, b) => a.id - b.id));
      }
    }).clone();
  });

  app.get("/projects/:id", async (_req, res) => {
    try {
      const project = await ProjectModel.findOne({ id: _req.params.id });
      res.json(project);
    } catch (error) {
      throw new Error(`Failed to query project: ${error}`);
    }
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
      const projects = await ProjectModel.find();
      const lastProjectId = projects.length > 0 ? projects[projects.length - 1].id : 0;

      const newProject = new ProjectModel({
        ...req.body,
        id: lastProjectId + 1,
      });
      await newProject.save();
      await ContainerModel.create({ projectId: newProject.id, id: 1, name: "TO DO" });

      res.json(newProject);
    } catch (error) {
      throw new Error(`Failed to create project: ${error}`);
    }
  });

  app.delete("/projects/:id", async (req, res) => {
    try {
      const project = await ProjectModel.findOne({ id: req.params.id });
      if (!project) {
        return res.status(404).send("Project not found");
      }
      await project.remove();
      res.send("Project deleted");
    } catch (error) {
      throw new Error(`Failed to delete project: ${error}`);
    }
  });
};
