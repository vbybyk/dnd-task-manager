import { Application } from "express";
import { ContainerModel } from "../models/ContainerSchema";

export const attachContainerRoutes = (app: Application) => {
  app.get("/projects/:id/containers", async (_req, res) => {
    try {
      const containers = await ContainerModel.find({ projectId: _req.params.id });
      res.send(containers?.sort((a, b) => a.id - b.id));
    } catch (err) {
      res.status(500).send(`Error getting containers: ${err}`);
    }
  });

  app.post("/projects/:id/containers", async (_req, res) => {
    try {
      const containers = await ContainerModel.find({ projectId: _req.params.id });
      const lastContainerId = containers.length > 0 ? containers[containers.length - 1].id : 0;
      const newContainerId = lastContainerId + 1;
      const newContainer = await ContainerModel.create({ ..._req.body, id: newContainerId });
      res.json(newContainer);
    } catch (err) {
      res.status(500).send(`Error creating container: ${err}`);
    }
  });
};
