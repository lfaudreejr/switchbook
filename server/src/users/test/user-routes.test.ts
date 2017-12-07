/* eslint-env node, mocha */
import * as chai from 'chai';
import * as chaiPromise from 'chai-as-promised';
import * as request from 'request';
import * as superTest from 'supertest';
import { server } from '../../';

chai.use(chaiPromise);

// describe('user routes', () => {
//   describe('get /user/books', () => {
//     it('should return status 200 with json', (done) => {
//       superTest(server).get('/user/books').expect('Content-Type', /json/).expect(200, done);
//     });
//   });

//   server.close();
// });
