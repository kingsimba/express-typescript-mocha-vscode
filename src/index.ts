import express from "express";
import { usersRouter } from "./users";
import { authRouter } from "./auth";
import request from "request";

export const app = express();
const port = 8080; // default port to listen

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get('/navinfo', async (req, res) => {
    request('https://www.navinfo.com', { json: true }, (err, res1, body) => {
        if (res1) {
            res.send(res1.body);
        } else {
            res.sendStatus(404);
        }
    });
});

app.use('/api/v1/docs', express.static('docs')); // serve static files
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
