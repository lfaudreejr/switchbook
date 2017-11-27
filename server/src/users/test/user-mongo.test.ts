/* eslint-env node, mocha */
import * as chai from 'chai';
import * as chaiPromise from 'chai-as-promised';
import { usersDB } from '../user-mongo';
import { User } from '../User';

chai.use(chaiPromise);

const USER = new User('Faudree', 'Larry', 'test@test.com');
USER.setId('1');
let user_id: any = USER._id;
let user: any;

describe('user-mongo', () => {
  describe('connectDB()', () => {
    let _db = usersDB.connectDB();
    it('should return a fulfilled promise', (done) => {
      chai.expect(_db).to.be.fulfilled.and.notify(done);
    });
    it('should return a mongo db', (done) => {
      chai.expect(_db).to.eventually.haveOwnProperty('s').that.has.property('databaseName').and.notify(done);
    });
    it('should return databaseName of switchbook', (done) => {
      chai
        .expect(_db)
        .to.eventually.haveOwnProperty('s')
        .that.has.property('databaseName')
        .that.equals('switchbook')
        .and.notify(done);
    });
  });

  describe('create()', () => {
    user = usersDB.create(USER);
    it('should return fufilled', (done) => {
      chai.expect(user).to.eventually.be.fulfilled.and.notify(done);
    });
    it('should return created user', (done) => {
      chai
        .expect(user)
        .to.eventually.haveOwnProperty('value')
        .that.haveOwnProperty('_id')
        .that.equals('1')
        .and.notify(done);
    });
  });

  describe('read()', () => {
    user = usersDB.read(user_id);
    it('should return fulfilled', (done) => {
      chai.expect(user).to.eventually.be.fulfilled.and.notify(done);
    });
    it('should return user', (done) => {
      chai
        .expect(user)
        .to.eventually.haveOwnProperty('value')
        .that.haveOwnProperty('_id')
        .that.equals('1')
        .and.notify(done);
    });
  });

  describe('destroy()', () => {
    user = usersDB.destroy(user_id);
    it('should return deleted user', (done) => {
      chai.expect(user).to.eventually.be.fulfilled.and.notify(done);
    });
    it('should return destroyed user', (done) => {
      chai
        .expect(user)
        .to.eventually.haveOwnProperty('value')
        .that.haveOwnProperty('_id')
        .that.equals('1')
        .and.notify(done);
    });
  });
});
