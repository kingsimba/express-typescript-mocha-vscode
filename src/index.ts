import express from "express";
import {users} from "./users"

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world 2!");
});

app.get("/users", (req, res) => {
    res.send(users.getUsers());
})

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    res.send(users.getUserWithId(parseInt(id, 10)));
})

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
