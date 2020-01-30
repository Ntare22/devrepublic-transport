import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
const data = [{
  email: 'addas@gmail.com',
  password: 'Ntare1234',
}, {
  email: 'addas@gmail.com',
  password: 'Ntare34',
}, {
  email: 'add@gmail.com',
  password: 'Ntare1234',
}];

describe('2. POST login into an account ', () => {
  it('should return user is logged in', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(data[0])
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have
          .property('message')
          .eql(
            'User is logged in',
          );
        done();
      });
  });

  it('should return user email or password is incorrect', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(data[1])
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.a('object');
        res.body.should.have
          .property('error')
          .eql(
            'incorrect password or email',
          );
        done();
      });
  });

  it('should return user email or password is incorrect', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(data[2])
      .end((err, res) => {
        res.should.have.status(409);
        res.should.be.a('object');
        res.body.should.have
          .property('message')
          .eql(
            'Email or password does not exist',
          );
        done();
      });
  });
});
