import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from './index';

const expect = chai.expect;

chai.use(chaiHttp);

describe('App', () => {
  describe('/api/v1/users', () => {
    it('return an array of users', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Array');
          expect(res.body[0]).to.have.keys('id', 'name');

          done();
        });
    });
  });

  describe('/api/v1/users/:id', () => {

    it('return 404 when the id is invalid', (done) => {
      chai.request(app)
        .get('/api/v1/users/999')
        .end(  (err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).equals(404);

          done();
        });
    });

  });
});
