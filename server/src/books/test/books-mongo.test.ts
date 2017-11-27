/* eslint-env node, mocha */
import * as chai from 'chai';
import * as chaiPromise from 'chai-as-promised';
import { booksDB } from '../book-mongo';
import { Book } from '../Book';

chai.use(chaiPromise);

const BOOK = new Book(
  'cWAF8_uH1_sC',
  'Shogun',
  [ 'James Clavell' ],
  'A bold English adventurer. An invincible Japanese warlord. A beautiful woman torn between two ways of life, two ways of love. All brought together in an extraordinary saga of a time and a place aflame with conflict, passion, ambition, lust, and the struggle for power... From the Paperback edition.',
  'http://books.google.com/books/content?id=cWAF8_uH1_sC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
);
let book: any;

describe('book-mongo', () => {
  describe('connectDB()', () => {
    let _db = booksDB.connectDB();
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
    book = booksDB.create(BOOK);
    it('should return fulfilled', (done) => {
      chai.expect(book).to.eventually.be.fulfilled.and.notify(done);
    });
    it('should return created book', (done) => {
      chai
        .expect(book)
        .to.eventually.haveOwnProperty('value')
        .that.haveOwnProperty('_id')
        .that.equals('cWAF8_uH1_sC')
        .and.notify(done);
    });
  });

  describe('read()', () => {
    book = booksDB.read('cWAF8_uH1_sC');
    it('should return fulfilled', (done) => {
      chai.expect(book).to.eventually.be.fulfilled.and.notify(done);
    });
    it('should return found book', (done) => {
      chai
        .expect(book)
        .to.eventually.haveOwnProperty('value')
        .that.haveOwnProperty('_id')
        .that.equals('cWAF8_uH1_sC')
        .and.notify(done);
    });
  });

  describe('readAll()', () => {
    book = booksDB.readAll();
    it('should return fulfilled', (done) => {
      chai.expect(book).to.eventually.be.fulfilled.and.notify(done);
    });
    it('should return all books', (done) => {
      chai
        .expect(book)
        .to.eventually.haveOwnProperty('value')
        .that.haveOwnProperty('_id')
        .that.equals('cWAF8_uH1_sC')
        .and.notify(done);
    });
  });

  describe('destroy()', () => {
    book = booksDB.destroy('cWAF8_uH1_sC');
    it('should return fulfilled', (done) => {
      chai.expect(book).to.eventually.be.fulfilled.and.notify(done);
    });
    it('should return destroyed book', (done) => {
      chai
        .expect(book)
        .to.eventually.haveOwnProperty('value')
        .that.haveOwnProperty('_id')
        .that.equals('cWAF8_uH1_sC')
        .and.notify(done);
    });
  });
});
