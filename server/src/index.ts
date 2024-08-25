import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Application } from "express";
import mongoose from "mongoose";
import { attachProjectRoutes } from "./routes/projects";
import { attachContainerRoutes } from "./routes/containers";
import { attachTaskRoutes } from "./routes/tasks";
import { attachLabelRoutes } from "./routes/labels";
import { attachUserRoutes } from "./routes/users";

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

  attachProjectRoutes(app);
  attachContainerRoutes(app);
  attachTaskRoutes(app);
  attachLabelRoutes(app);
  attachUserRoutes(app);

  app.listen(port);
  console.log(`App is listening on port ${port}`);
};

mount(express());
