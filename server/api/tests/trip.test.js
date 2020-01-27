import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
let tripData = [{
  destination: 'Kimironko',
  location: 'stadium',
},
{
destination: 'kanombe',
location: 'remera',
}];

describe('2. Trip tests ', () => {

  it('should return trip has been created successfully', (done) => {
    chai
      .request(app)
      .post('/api/trip')
      .send(tripData[0])
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').eql(' Trip created successfully');
        done();
      });
    })
      it('should return enter valid  destination ',(done) => {
        chai
          .request(app)
          .post('/api/trip')
          .send(tripData[1])
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
  })
});
