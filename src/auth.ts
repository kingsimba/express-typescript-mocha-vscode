import { Guid } from 'guid-typescript';
import express from 'express';

export class AuthResult {
    constructor(public token: string) { }
}

export class Auth {
    maxAge = 1000 * 60 * 24 * 7; // 7 days

    /**
     * Perform login
     * @param username The username
     * @param password The password
     * @returns Return an AuthResult which contains a token. Return null if failed.
     */
    login(username: string, password: string): AuthResult | null {
        if (username === 'simba' && password === 'mypassword') {
            const guid = Guid.create();
            return new AuthResult(guid.toString());
        }

        return null;
    }
}

const auth = new Auth();

// Create a sub-router
export const authRouter = express.Router();

// for "/login", verify user name and password
authRouter.post('/login', (req, res) => {
    const result = auth.login(req.query.username, req.query.password)
    if (result) {
        // set cookie of login succeeded
        res.cookie('authUser', 'simba', { maxAge: auth.maxAge });
        res.cookie('authToken', result.token);
        res.send({ status: 200, autoToken: result.token });
    } else {
        // return 401 and error message if failed
        res.status(401).send({ message: 'Incorrect user name or password.' });
    }
});

authRouter.get('/who-am-i', (req, res) => {
    if (req.cookies != undefined && req.cookies.authUser != undefined) {
        res.send({ username: req.cookies.authUser });
    } else {
        res.status(401).send({ message: 'Please login first' });
    }
});

authRouter.post('/logout', (req, res) => {
    // clear Cookie
    res.clearCookie('authUser');
    res.clearCookie('autoToken');
    res.send({ status: 200 });
});
