/* eslint-env node, mocha */
import * as chai from 'chai';
import * as chaiPromise from 'chai-as-promised';
import * as mongodb from 'mongodb';
import * as mongo from '../../mongodb';
import { Book, volume, pictures } from '../Book';

chai.use(chaiPromise);

const COLLECTION = 'books';
const VOLUMEINFO: volume = {
  title: 'Shogun',
  authors: [ 'James Clavell' ],
  description:
    'A bold English adventurer. An invincible Japanese warlord. A beautiful woman torn between two ways of life, two ways of love. All brought together in an extraordinary saga of a time and a place aflame with conflict, passion, ambition, lust, and the struggle for power... From the Paperback edition.',
  imageLinks: <pictures>{
    smallThumbnail:
      'http://books.google.com/books/content?id=cWAF8_uH1_sC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    thumbnail:
      'http://books.google.com/books/content?id=cWAF8_uH1_sC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
  },
  owners: []
};
const BOOK = new Book('test', VOLUMEINFO);
let book: any;

describe('book-mongo', () => {
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
    book = mongo.create(BOOK, COLLECTION);
    it('should return fulfilled', (done) => {
      chai.expect(book).to.eventually.be.fulfilled;
      done();
    });
    it('should return created book', (done) => {
      chai.expect(book).to.eventually.haveOwnProperty('value').that.haveOwnProperty('_id').that.equals('test');
      done();
    });
  });

  describe('read()', () => {
    book = mongo.read('test', COLLECTION);
    it('should return fulfilled', (done) => {
      chai.expect(book).to.eventually.be.fulfilled;
      done();
    });
    it('should return found book', (done) => {
      chai.expect(book).to.eventually.haveOwnProperty('value').that.haveOwnProperty('_id').that.equals('test');
      done();
    });
  });

  describe('readAll()', () => {
    book = mongo.readAll(COLLECTION);
    it('should return fulfilled', (done) => {
      chai.expect(book).to.eventually.be.fulfilled;
      done();
    });
    it('should return all books', (done) => {
      chai.expect(book).to.eventually.haveOwnProperty('value').that.haveOwnProperty('_id').that.equals('test');
      done();
    });
  });

  describe('destroy()', () => {
    book = mongo.destroy('test', COLLECTION);
    it('should return fulfilled', (done) => {
      chai.expect(book).to.eventually.be.fulfilled;
      done();
    });
    it('should return destroyed book', (done) => {
      chai.expect(book).to.eventually.haveOwnProperty('value').that.haveOwnProperty('_id').that.equals('test');
      done();
    });
  });
});
