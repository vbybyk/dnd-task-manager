import express, {Application} from "express";
 
const port = 9000;

const mount = async (app: Application) => {

    // app.use(express.static(`${__dirname}/client`));
    // app.get("/*", (_req, res) => res.sendFile(`${__dirname}/client/index.html`));

app.get('/', (_req, res) => {
    res.send('hi there common man man!')
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

