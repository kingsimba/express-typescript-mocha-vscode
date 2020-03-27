export class Users
{
    private users = [
        { id: 1, name: "Donald Trump" },
        { id: 2, name: "Mike Pence" },
    ];

    getUsers() {
        return this.users;
    }

    getUserWithId(id : number) {
        return this.users.find(o => o.id === id );
    }
}

export const users = new Users();
