import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../../app';

chai.use(chatHttp);

describe('App tests', () => {
  it('should display a welcome message', (done) => {
    chai
      .request(app)
      .get('/')
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .eql(
            'Welcome to devRepublic transport',
          );
        done();
      });
  });
});
