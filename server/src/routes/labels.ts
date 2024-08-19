import { Application } from "express";
import { LabelModel } from "../models/LabelSchema";

export const attachLabelRoutes = (app: Application) => {
  app.get("/projects/:id/labels", async (_req, res) => {
    try {
      const labels = await LabelModel.find({ projectId: _req.params.id });
      res.json(labels);
    } catch (err) {
      res.status(500).send(`Error getting labels: ${err}`);
    }
  });

  app.post("/projects/:id/labels", async (_req, res) => {
    try {
      const labels = await LabelModel.find({ projectId: _req.params.id });
      const lastLabelId = labels.length > 0 ? labels[labels.length - 1].id : 0;
      const newLabelId = lastLabelId + 1;
      const newLabel = await LabelModel.create({ ..._req.body, id: newLabelId });
      res.json(newLabel);
    } catch (err) {
      res.status(500).send(`Error creating label: ${err}`);
    }
  });

  app.put("/projects/:projectId/labels/:labelId", async (_req, res) => {
    try {
      const { labelId, projectId } = _req.params;
      const updatedLabel = await LabelModel.findOneAndUpdate({ id: labelId, projectId }, _req.body, {
        returnOriginal: false,
      });
      res.json(updatedLabel);
    } catch (err) {
      res.status(500).send(`Error updating label: ${err}`);
    }
  });

  app.put("/projects/:projectId/labels", async (_req, res) => {
    try {
      const { projectId } = _req.params;
      const updatedLabels = await Promise.all(
        _req.body.map(async (label: any) => {
          const updatedLabel = await LabelModel.findOneAndUpdate({ id: label.id, projectId }, label, {
            returnOriginal: false,
          });
          return updatedLabel;
        })
      );
      res.json(updatedLabels);
    } catch (err) {
      res.status(500).send(`Error updating labels: ${err}`);
    }
  });

  app.delete("/projects/:projectId/labels/:labelId", async (_req, res) => {
    try {
      await LabelModel.findOneAndDelete({ id: _req.params.labelId, projectId: _req.params.projectId });
      res.send("Label deleted");
    } catch (err) {
      res.status(500).send(`Error deleting label: ${err}`);
    }
  });
};
