import { Application } from "express";
import { UserModel } from "../models/UsersSchema";

export const attachUserRoutes = (app: Application) => {
  app.get("/current/:id", async (_req, res) => {
    try {
      const user = await UserModel.findOne({ id: _req.params.id });
      res.json(user);
    } catch (err) {
      res.status(500).send(`Error getting user: ${err}`);
    }
  });

  app.put("/users/:id", async (_req, res) => {
    try {
      const { id } = _req.params;
      const updatedUser = await UserModel.findOneAndUpdate({ id }, _req.body, { returnOriginal: false });
      res.json(updatedUser);
    } catch (err) {
      res.status(500).send(`Error updating user: ${err}`);
    }
  });

  app.delete("/users/:id", async (_req, res) => {
    try {
      await UserModel.findOneAndDelete({ id: _req.params.id });
      res.send("User deleted");
    } catch (err) {
      res.status(500).send(`Error deleting user: ${err}`);
    }
  });
};
