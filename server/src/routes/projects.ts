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
