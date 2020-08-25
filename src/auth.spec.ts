import { Auth } from "./auth";
import { expect } from 'chai';

describe('Auth', () => {
    const auth = new Auth();

    it('should return valid AuthResult if auth succeed', () => {
        const result = auth.login('simba', 'mypassword');
        expect(result).is.not.null;
        expect(result!.token).to.be.a('String')
            .which.matches(/[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+/);
    });

    it('should undefined if auth failed', () => {
        expect(auth.login('simba', 'badpassword')).not.exist;
    });
});
