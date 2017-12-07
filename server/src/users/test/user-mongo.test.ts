/* eslint-env node, mocha */
import * as chai from 'chai';
import * as chaiPromise from 'chai-as-promised';
import * as mongo from '../../mongodb';
import { User } from '../User';

chai.use(chaiPromise);

const COLLECTION = 'users';
const USER = new User('1');
let user_id: any = USER._id;
let user: any;

describe('user-mongo', () => {
  after(() => mongo.close());

  describe('connectDB()', () => {
    let _db = mongo.connectDB();
    it('should return a fulfilled promise', (done) => {
      chai.expect(_db).to.be.fulfilled;
      done();
    });
    it('should return a mongo db', (done) => {
      chai.expect(_db).to.eventually.haveOwnProperty('s').that.has.property('databaseName');
      done();
    });
    it('should return databaseName of switchbook', (done) => {
      chai.expect(_db).to.eventually.haveOwnProperty('s').that.has.property('databaseName').that.equals('switchbook');
      done();
    });
  });

  describe('create()', () => {
    user = mongo.create(USER, COLLECTION);
    it('should return fufilled', (done) => {
      chai.expect(user).to.eventually.be.fulfilled;
      done();
    });
    it('should return created user', (done) => {
      chai.expect(user).to.eventually.haveOwnProperty('value').that.has.property('_id').that.equals('1');
      done();
    });
  });

  describe('read()', () => {
    user = mongo.read(user_id, COLLECTION);
    it('should return fulfilled', (done) => {
      chai.expect(user).to.eventually.be.fulfilled;
      done();
    });
    it('should return user', (done) => {
      chai.expect(user).to.eventually.haveOwnProperty('value').that.haveOwnProperty('_id').that.equals('1');
      done();
    });
  });

  describe('destroy()', () => {
    user = mongo.destroy(user_id, COLLECTION);
    it('should return deleted user', (done) => {
      chai.expect(user).to.eventually.be.fulfilled;
      done();
    });
    it('should return destroyed user', (done) => {
      chai.expect(user).to.eventually.haveOwnProperty('value').that.haveOwnProperty('_id').that.equals('1');
      done();
    });
  });
});
