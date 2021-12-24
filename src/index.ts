import express from "express";
import { usersRouter } from "./users";
import { authRouter } from "./auth";
import request from "request";
import cookieParser from 'cookie-parser';

const PORT = 8080; // default port to listen

// Create Express instance
export const app = express();

// A middleware to inject 'cookies' in express.Request
// See https://www.npmjs.com/package/cookie-parser
app.use(cookieParser());

// A simplest request handler
app.get("/", (req, res) => {
    res.send("Hello world!");
});

// Demonstrate how to read data from another server and return the result.
app.get('/navinfo', (req, res) => {
    request('https://www.navinfo.com', { json: true }, (err, res1) => {
        if (res1) {
            res.send(res1.body);
        } else {
            res.sendStatus(404);
        }
    });
});

// Demonstrate how to serve static files
app.use('/api/v1/docs', express.static('docs')); // serve static files

// Sub-routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);

// start the Express server
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
