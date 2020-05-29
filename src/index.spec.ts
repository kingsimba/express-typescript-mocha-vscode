import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from './index';

const expect = chai.expect;

chai.use(chaiHttp);

describe('App', () => {
    describe('/api/v1/users', () => {
        it('return an array of users', async () => {
            const res = await chai.request(app).get('/api/v1/users');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('Array');
            expect(res.body[0]).to.have.keys('id', 'name');
        });
    });

    describe('/api/v1/users/:id', () => {

        it('return 404 when the id is invalid', async () => {
            const res = await chai.request(app).get('/api/v1/users/999');
            expect(res).to.have.status(404);
            expect(res.body.status).equals(404);
        });

    });

    describe('/api/v1/auth/login', () => {
        it('should fail if password is incorrect', async () => {
            const res = await chai.request(app).post('/api/v1/auth/login?username=simba&password=bad');
            expect(res).to.have.status(401);
            expect(res).to.not.have.cookie('authUser');
            expect(res).to.not.have.cookie('authToken');
        });

        it('should succeed if password is correct', async () => {
            // Agent is used to simulate a single user interaction session.
            // So it can remember cookies.
            const agent = chai.request.agent(app);

            let res = await agent.get('/api/v1/auth/who-am-i');
            expect(res, 'return 401 because we have not login yet').to.have.status(401);

            res = await agent.post('/api/v1/auth/login?username=simba&password=mypassword');
            expect(res).to.have.status(200);
            expect(res).to.have.cookie('authUser', 'simba');
            expect(res).to.have.cookie('authToken');

            res = await agent.get('/api/v1/auth/who-am-i');
            expect(res).to.have.status(200);
            expect(res.body, 'Because we have login, it should return user name').
                to.deep.includes({ username: 'simba' });
        });
    });
});
