import * as express from 'express';
import * as mongo from '../mongodb';
import { jwtCheck } from '../auth/authService';
import { getBook } from '../googleApis/googleBooks';
import { User } from './User';

const router = express.Router();

const BOOKS = 'books';

/**
 * Add Book by User
 */
router.post('/books', async (req, res) => {
  const USER = req.body.user;
  try {
    const BOOK = await getBook(req.body.title, req.body.author);
    const FOUND = await mongo.read(BOOK.data.items[0].id, BOOKS, {});
    if (FOUND) {
      const ISOWNED = FOUND.owners.find((owner: string) => {
        return owner === USER;
      });
      if (ISOWNED) {
        return res.json(FOUND);
      } else {
        const UPDATED = await mongo.update(FOUND._id, BOOKS, { $push: { owners: USER } });
        console.log(UPDATED);
        return res.json(UPDATED.value);
      }
    } else {
      const book = {
        _id: BOOK.data.items[0].id,
        volumeInfo: BOOK.data.items[0].volumeInfo,
        owners: [ USER ]
      };
      const CREATE = await mongo.create(book, BOOKS, {});
      return res.json(CREATE.ops[0]);
    }
  } catch (error) {
    throw new Error(error.stack);
  }
});
/**
 * Get Book by User (Read)
 */
// router.get('/books/:id', (req, res) => {});
/**
 * Add User to Book (Update)
 */
// router.put('/books/:id', (req, res) => {});
/**
 * Delete User from Book (Delete)
 */
// router.delete('/books/:id', (req, res) => {});

export default router;
