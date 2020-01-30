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
let tripId;
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

describe('TRIPS TESTS', () => {
  it('should return user is logged in', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
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
      .post('/api/v1/trip')
      .send(tripData[0])
      .set('token', token)
      .end((err, res) => {
        tripId = res.body.data.tripId;
        res.should.have.status(201);
        res.body.should.have.property('message').eql(' Trip created successfully');
        done();
      });
  });
  it('should return enter valid  destination ', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip')
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
      .post('/api/v1/trip')
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
      .post('/api/v1/trip')
      .set('token', wrongToken)
      .send(tripData[0])
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error').eql('Please enter valid token');
        done();
      });
  });

  it('should return Trip Details', (done) => {
    chai
      .request(app)
      .get('/api/v1/specificTrip')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have
          .property('message')
          .eql(
            'Trip Details',
          );
        done();
      });
  });
  it('should return all passengers', (done) => {
    chai
      .request(app)
      .get('/api/v1/driver')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have
          .property('message')
          .eql(
            'All passengers',
          );
        res.body.should.have
          .property('data');
        done();
      });
  });
  it('should return there is no such user', (done) => {
    chai
      .request(app)
      .get('/api/v1/specificTrip')
      .set('token', wrongToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.a('object');
        res.body.should.have
          .property('error')
          .eql(
            'there is no such user',
          );
        done();
      });
  });
  it('should return trip has been deleted successfully', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/trip/${tripId}`)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Trip deleted successfully');
        done();
      });
  });
});
