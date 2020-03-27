import { expect } from 'chai';
import { users } from './users';

describe('User', () => {
    it('can show all users', () => {
        expect(users.getUsers()).to.be.an('array')
            .and.have.length.greaterThan(1);
    });

    it('have Donald Trump', () => {
        expect(users.getUsers().find(o => o.name.indexOf('Trump')).name)
            .to.be.a('String')
            .and.matches(/\bDonald\b/);
    });
})
