import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
const tripData = [{
  destination: 'Kimironko',
  location: 'stadium',
},
{
  destination: 'kanombe',
  location: 'remera',
}];
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
let token;
const wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhaW1lQGFuZGV00 bSIsImlhdCI6MTU4MDIyNzQ2NywiZXhwIjoxNTgwMzEzODY3fQ.306eVOmXJ34bLVh8ISMhWBoSDHx31viJsojMBVEXY68';

describe('2. POST login into an account ', () => {
  it('should return user is logged in', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send(data[0])
      .end((err, res) => {
        token = res.body.token;
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
  it('should return trip has been created successfully', (done) => {
    chai
      .request(app)
      .post('/api/trip')
      .send(tripData[0])
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').eql(' Trip created successfully');
        done();
      });
  });
  it('should return enter valid  destination ', (done) => {
    chai
      .request(app)
      .post('/api/trip')
      .set('token', token)
      .send(tripData[1])
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return please enter token ', (done) => {
    chai
      .request(app)
      .post('/api/trip')
      .set('token', '')
      .send(tripData[0])
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error').eql('No token provided');
        done();
      });
  });
  it('should return please enter a valid token ', (done) => {
    chai
      .request(app)
      .post('/api/trip')
      .set('token', wrongToken)
      .send(tripData[0])
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error').eql('Please enter valid token');
        done();
      });
  });
});

describe('View Specific Trip ', () => {
  it('should return the trip created', (done) => {
    chai
      .request(app)
      .get('/api/specificTrip')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have
          .property('message')
          .eql(
            'Success',
          );
        done();
      });
  });
});
