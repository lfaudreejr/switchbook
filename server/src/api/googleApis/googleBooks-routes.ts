import * as express from 'express';
import * as DB from '../../helpers/database'
import { getBook, getFiveBooks } from '../googleApis/googleBooks';
import { jwtCheck } from '../../auth/authService';
const router = express.Router();

// TODO: un comment below when done with developing
router.use(jwtCheck)

router.post('/', (req, res) => {
  const { title, author } = req.body.book;
  let book = getBook(title, author);
  book
    .then((results) => {
      return res.send(results);
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
});
/**
 * Get 5 Matching Books
 */
router.post('/books', async (req, res) => {
  const { title, author } = req.body
  console.log('title', title)
  // First - search DB for book
  let foundBook;

  foundBook = await DB.find({ title: title }, 'books', {})

  if (foundBook) {
    return res.json(foundBook)
  } else {
    // Else - search google
    let books = await getFiveBooks(title, author)
    console.log('books', books.data)
    return res.json(books.data)
  }

})

export default router;
