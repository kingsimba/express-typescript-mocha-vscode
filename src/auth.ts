import { Guid } from 'guid-typescript';
import express from 'express';

export class AuthResult {
    constructor(public token: string) { }
}

// tslint:disable-next-line: max-classes-per-file
export class Auth {
    maxAge = 1000 * 60 * 24 * 7; // 7 days

    login(username: string, password: string): AuthResult {
        if (username == 'simba' && password == 'mypassword') {
            const guid = Guid.create();
            return new AuthResult(guid.toString());
        }
    }
}

const auth = new Auth();

export const authRouter = express.Router();

authRouter.post('/login', (req, res) => {
    const result = auth.login(req.query.username, req.query.password)
    if (result) {
        res.cookie('authUser', 'simba', { maxAge: auth.maxAge });
        res.cookie('authToken', result.token);
        res.send({ status: 200, autoToken: result.token });
    } else {
        res.sendStatus(401);
    }
});

authRouter.post('/logout', (req, res) => {
    res.cookie('authUser', '');
    res.cookie('autoToken', '');
    res.send({ status: 200 });
});
