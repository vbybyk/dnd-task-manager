import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Application } from "express";
import mongoose from "mongoose";
import { ProjectModel } from "./models/ProjectSchema";

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

  // app.get("/projects/:id", async (_req, res) => {
  //   await ProjectModel.find({ id: _req.params.id }, (err: any, data: any) => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       res.send(data);
  //     }
  //   }).clone();
  // });

  app.put("/projects/:id/name", async (_req, res) => {
    const newName = "Project ONE NAME";
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

  // const startServer = async() => {
  //     await server.start();
  //     server.applyMiddleware({app, path: "/api"})
  // }
  // startServer()
  app.listen(port);
  console.log(`App is listening on port ${port}`);

  // console.log(`App is listening on port ${process.env.PORT}`)
};

mount(express());
