import { expect } from 'chai';
import { users } from './users';

describe('User', () => {
    it('can show all users', () => {
        expect(users.getUsers()).to.be.an('array')
            .and.have.length.greaterThan(1);
    });

    it('can find user with id', () => {
        const user = users.getUserWithId(1);
        expect(user).exist;
        expect(user!.name).equals("Donald Trump");
    });

    it('should return null when id not exists', () => {
        expect(users.getUserWithId(999)).to.equals(undefined);
    });

    it('have Donald Trump', () => {
        const trump = users.getUsers().find(o => o.name.indexOf('Trump'));
        expect(trump).exist;
        expect(trump!.name)
            .to.be.a('String')
            .and.matches(/\bDonald\b/);
    });
})
