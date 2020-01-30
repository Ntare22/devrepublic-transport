import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
const data = [{
  firstName: 'Jim',
  lastName: 'Ntare',
  email: 'addas@gmail.com',
  password: 'Ntare1234',
  status: 'driver',
}, {
  firstName: '',
  lastName: 'Ntare',
  email: 'addas@gmail.com',
  password: 'Ntare1234',
  status: 'passenger',
}, {
  firstName: 'Jim',
  lastName: '',
  email: 'addas@gmail.com',
  password: 'Ntare1234',
  status: 'passenger',
}, {
  firstName: 'Jim',
  lastName: 'Ntare',
  email: '',
  password: 'Ntare1234',
  status: 'passenger',
}, {
  firstName: 'Jim',
  lastName: 'Ntare',
  email: 'addas@gmail.com',
  password: 'N',
  status: 'passenger',
}];

describe('1. POST register an account ', () => {
  it('should return user has been created', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/register')
      .send(data[0])
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        res.body.should.have
          .property('message')
          .eql(
            'User has been created',
          );
        done();
      });
  });
  it('should return firstname is required', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/register')
      .send(data[1])
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        done();
      });
  });
  it('should return lastname is required', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/register')
      .send(data[2])
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        done();
      });
  });
  it('should return email is required', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/register')
      .send(data[3])
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        done();
      });
  });
  it('should return should be at least 8 characters is required', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/register')
      .send(data[4])
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        done();
      });
  });
});
