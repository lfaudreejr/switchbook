/* eslint-env node, mocha */
import * as chai from 'chai';
import * as chaiPromise from 'chai-as-promised';
import * as request from 'request';
import * as superTest from 'supertest';
import { server } from '../../';

chai.use(chaiPromise);

describe('book routes', () => {
  let myServer = server;

  after(function () {
    myServer.close();
  });

  describe('get /', () => {
    it('should return status 200 with json', (done) => {
      superTest(myServer).get('/books').expect('Content-Type', /json/).expect(200);
      done();
    });
  });
});
