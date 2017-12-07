/* eslint-env node, mocha */
import * as chai from 'chai';
import * as chaiPromise from 'chai-as-promised';

chai.use(chaiPromise);

import { getBook } from '../googleBooks';

describe('google Books Api', () => {
  describe('getBook()', () => {
    const book = getBook('Shogun', 'James Clavell');
    it('return status 200', (done) => {
      chai.expect(book).to.eventually.haveOwnProperty('status').that.equals(200);
      done();
    });
    it('returns items array', (done) => {
      chai.expect(book).to.eventually.haveOwnProperty('data').that.haveOwnProperty('items');
      done();
    });
    it('returns book details', (done) => {
      chai.expect(book).to.eventually.haveOwnProperty('data').that.haveOwnProperty('items').to.have.deep.members([
        {
          id: 'cWAF8_uH1_sC',
          volumeInfo: {
            title: 'Shogun',
            authors: [ 'James Clavell' ],
            description:
              'A bold English adventurer. An invincible Japanese warlord. A beautiful woman torn between two ways of life, two ways of love. All brought together in an extraordinary saga of a time and a place aflame with conflict, passion, ambition, lust, and the struggle for power... From the Paperback edition.',
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=cWAF8_uH1_sC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=cWAF8_uH1_sC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            }
          }
        }
      ]);
      done();
    });
  });
});
