import express, {Application} from "express";
import mongoose from 'mongoose';
import { ProjectModel } from "./models/ProjectSchema";
 
const port = 9000;

const mount = async (app: Application) => {

    (await mongoose.connect("mongodb+srv://vbybyk:mongovbybyk21@cluster0.antv1.mongodb.net/dnd?retryWrites=true&w=majority"))
    // app.use(express.static(`${__dirname}/client`));
    // app.get("/*", (_req, res) => res.sendFile(`${__dirname}/client/index.html`));

    app.get('/projects', async (_req, res) => {
        await ProjectModel.find({}, (err: any, data: any) => {
            if(err) {
                res.send(err)
            } else {
                res.send(data)
            }
        }).clone()
    })

    // const startServer = async() => {
    //     await server.start();
    //     server.applyMiddleware({app, path: "/api"})
    // }
    // startServer()
    app.listen(port)
    console.log(`App is listening on port ${port}`)

    // console.log(`App is listening on port ${process.env.PORT}`)
}

mount(express());

