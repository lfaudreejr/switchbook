import * as express from 'express';
import { getBook } from '../googleApis/googleBooks';
import { jwtCheck } from '../auth/authService';
import { booksDB } from '../books/book-mongo';
import { Book } from '../books/Book';

const router = express.Router();

const BOOK = new Book(
  'cWAF8_uH1_sC',
  'Shogun',
  [ 'James Clavell' ],
  'A bold English adventurer. An invincible Japanese warlord. A beautiful woman torn between two ways of life, two ways of love. All brought together in an extraordinary saga of a time and a place aflame with conflict, passion, ambition, lust, and the struggle for power... From the Paperback edition.',
  'http://books.google.com/books/content?id=cWAF8_uH1_sC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
);

router.get('/', (req, res) => {
  booksDB
    .readAll()
    .then((data: Book[]) => {
      res.json(BOOK); //TODO: change for prod
    })
    .catch((err: Error) => {
      res.json(err);
    });
});

export default router;
