import express from 'express';

interface User {
    id: number;
    name: string;
}

class Users {
    private users: User[] = [
        { id: 1, name: "Donald Trump" },
        { id: 2, name: "Mike Pence" },
    ];

    getUsers() {
        return this.users;
    }

    getUserWithId(id: number): User | undefined {
        return this.users.find(o => o.id === id);
    }
}

export const users = new Users();

// the router
export const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
    res.send(users.getUsers());
});

usersRouter.get('/:id', (req, res) => {
    const user = users.getUserWithId(+req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404);
        res.send({ status: 404 })
    }
});
