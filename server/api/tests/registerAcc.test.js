import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';


const {
  expect,
} = chai;
chai.use(chaiHttp);

describe('1. POST register an account ', () => {
  it('should return user has been created', (done) => {
    const data = {
      firstName: 'Jim',
      lastName: 'Ntare',
      email: 'jim@gmail.com',
      password: 'ntare12345',
      status: "passenger"
    }
  
    chai
      .request(app)
      .post('api/auth/register')
      .send(data)
      .end((err, res) => {
        console.log(err);
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});


